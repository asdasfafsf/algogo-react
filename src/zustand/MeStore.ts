import { create } from 'zustand';
import { getMe } from '../api/me';
import { getToken } from '../api/auth';

type MeStore = {
  me: Me | null;
  setMe: (me: Me | null) => void;
  isLogin: () => Promise<boolean>;
  updateMe: () => Promise<void>;
  fetchMe: () => Promise<Me | null>;
  fetchToken: () => Promise<void>,
  logout: () => void;
};

export const useMeStore = create<MeStore>((set) => ({
  me: null,
  setMe: (me: Me | null) => set({ me }),
  isLogin: async () => {
    const meString = localStorage.getItem('me');

    if (!meString) {
      return false;
    }

    return true;
  },
  updateMe: async () => {
    const meString = localStorage.getItem('me');
    let me;
    if (meString) {
      me = JSON.parse(meString);
    } else {
      const response = await getMe();
      if (response.statusCode === 200) {
        me = response.data;
      } else {
        me = null;
      }
    }

    set({ me });
  },
  fetchMe: async () => {
    try {
      const response = await getMe();
      if (response.statusCode !== 200) {
        return null;
      }
      const me = response.data;
      set({ me });
      localStorage.setItem('me', JSON.stringify(me));
      return me;
    } catch (error) {
      return null;
    }
  },
  fetchToken: async () => {
    const response = await getToken();

    if (response.statusCode !== 200) {
      throw new Error(response.errorMessage);
    }

    const { accessToken, refreshToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  logout: () => {
    set({ me: null });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('me');
  },
}));

export default useMeStore;

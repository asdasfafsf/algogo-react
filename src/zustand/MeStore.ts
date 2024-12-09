import { create } from 'zustand';
import { getMe, updateMe } from '../api/me';
import { getToken } from '../api/auth';

type MeStore = {
  me: Me | null;
  setMe: (me: Me | null) => void;
  isLogin: () => Promise<boolean>;
  updateMe: (requestUpdateMeDto: RequestUpdateMe) => Promise<void>;
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
  updateMe: async (requestUpdateMeDto: RequestUpdateMe) => {
    const response = await updateMe(requestUpdateMeDto);
    const { data } = response;
    const me = data;
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

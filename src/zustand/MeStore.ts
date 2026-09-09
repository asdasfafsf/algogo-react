import { create } from "zustand";
import { getMe, updateMe } from "../api/me";
import { getToken } from "../api/auth";
import { refresh } from "../api/auth-v2";
import {
  hasStoredSession,
  isBusinessSuccess,
  isHttpSuccess,
  requireRefreshToken,
} from "@/domain/account/session";

type MeStore = {
  me: Me | null;
  setMe: (me: Me | null) => void;
  isLogin: () => Promise<boolean>;
  updateMe: (
    requestUpdateMeDto: RequestUpdateMe,
  ) => Promise<ApiResponse<Me | null>>;
  fetchMe: () => Promise<Me | null>;
  fetchToken: () => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => void;
};

export const useMeStore = create<MeStore>((set, get) => ({
  me: null,
  setMe: (me: Me | null) => set({ me }),
  isLogin: async () => {
    const meString = localStorage.getItem("me");

    return hasStoredSession(meString);
  },
  updateMe: async (requestUpdateMeDto: RequestUpdateMe) => {
    const response = await updateMe(requestUpdateMeDto);

    if (isBusinessSuccess(response)) {
      const { data } = response;
      const me = data;
      set({ me });
    } else {
      const { me } = get();
      set({ me });
    }

    return response;
  },
  fetchMe: async () => {
    try {
      const response = await getMe();
      if (!isHttpSuccess(response)) {
        return null;
      }
      const me = response.data;
      set({ me });
      localStorage.setItem("me", JSON.stringify(me));
      return me;
    } catch (error) {
      return null;
    }
  },
  fetchToken: async () => {
    const response = await getToken();

    if (!isHttpSuccess(response)) {
      throw new Error(response.errorMessage);
    }

    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  },
  refresh: async () => {
    const oldRefreshToken = localStorage.getItem("refreshToken");

    requireRefreshToken(oldRefreshToken);
    const response = await refresh();

    if (!isHttpSuccess(response)) {
      throw new Error(response.errorMessage);
    }

    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  },
  logout: () => {
    set({ me: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("me");
  },
}));

export default useMeStore;

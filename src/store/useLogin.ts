import create from "zustand";

interface LoginState {
  isLogin: boolean;
  setIsLogin: (payload: boolean) => void;
}

export const useLogin = create<LoginState>(set => ({
  isLogin: false,
  setIsLogin: payload =>
    set(() => ({
      isLogin: payload
    }))
}));

import create from "zustand";

interface State {
  isLoading: boolean;
  setIsLoading: (payload: boolean) => void;
}

export const useCommon = create<State>(set => ({
  isLoading: false,
  setIsLoading: payload =>
    set(() => ({
      isLoading: payload
    }))
}));

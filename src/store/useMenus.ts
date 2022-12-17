import create from "zustand";

type MainMenu = "game" | "quiz";

interface MenusState {
  mainMenu: MainMenu;
  setMainMenu: (payload: MainMenu) => void;
}

export const useMenus = create<MenusState>(set => ({
  mainMenu: "game",
  setMainMenu: payload =>
    set(() => ({
      mainMenu: payload
    }))
}));

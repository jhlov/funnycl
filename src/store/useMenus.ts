import create from "zustand";

type MainMenu = "GAME" | "QUIZ";
type SubMenu = "GAME_LIST" | "QUIZ_LIST" | "CREATE_QUIZ";

interface MenusState {
  mainMenu: MainMenu;
  subMenu: SubMenu;
  setMainMenu: (payload: MainMenu) => void;
  setSubMenu: (payload: SubMenu) => void;
}

export const useMenus = create<MenusState>(set => ({
  mainMenu: "GAME",
  subMenu: "GAME_LIST",
  setMainMenu: payload => {
    const subMenu = payload === "GAME" ? "GAME_LIST" : "QUIZ_LIST";
    set(() => ({
      mainMenu: payload,
      subMenu
    }));
  },
  setSubMenu: payload =>
    set(() => ({
      subMenu: payload
    }))
}));

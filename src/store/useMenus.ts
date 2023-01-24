import create from "zustand";

type MainMenu = "GAME" | "QUIZ";
type SubMenu =
  | "GAME_LIST"
  | "CREATE_GAME"
  | "QUIZ_LIST"
  | "CREATE_QUIZ"
  | "MODIFY_QUIZ";

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
    set(() => ({
      mainMenu: payload
    }));
  },
  setSubMenu: payload => {
    set(() => ({
      subMenu: payload
    }));
  }
}));

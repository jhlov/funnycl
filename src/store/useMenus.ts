import create from "zustand";

type MainMenu = "game" | "quiz";
type SubMenu = "game_list" | "quiz_list" | "create_quiz";

interface MenusState {
  mainMenu: MainMenu;
  subMenu: SubMenu;
  setMainMenu: (payload: MainMenu) => void;
}

export const useMenus = create<MenusState>(set => ({
  mainMenu: "game",
  subMenu: "game_list",
  setMainMenu: payload => {
    const subMenu = payload === "game" ? "game_list" : "quiz_list";
    set(() => ({
      mainMenu: payload,
      subMenu
    }));
  }
}));

import { useEffect } from "react";
import { useMenus } from "store/useMenus";

const AdminGame = () => {
  const { setMainMenu, setSubMenu } = useMenus();

  useEffect(() => {
    setMainMenu("GAME");
    setSubMenu("GAME_LIST");
  }, []);

  return <div>게임</div>;
};

export { AdminGame };

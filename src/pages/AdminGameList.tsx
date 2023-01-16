import { useEffect } from "react";
import { useMenus } from "store/useMenus";

const AdminGameList = () => {
  const { setSubMenu } = useMenus();

  useEffect(() => {
    setSubMenu("GAME_LIST");
  }, []);

  return <div>AdminGameList</div>;
};

export { AdminGameList };

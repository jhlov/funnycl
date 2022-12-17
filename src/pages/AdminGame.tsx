import { useEffect } from "react";
import { useMenus } from "store/useMenus";

const AdminGame = () => {
  const { setMainMenu } = useMenus();

  useEffect(() => {
    setMainMenu("game");
  });

  return <div>게임</div>;
};

export { AdminGame };

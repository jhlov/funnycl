import { NewGame } from "components/admin/game/NewGame";
import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useGame } from "store/useGame";
import { useMenus } from "store/useMenus";

interface Params {
  id: string;
}

export const AdminGameModify = () => {
  const match = useRouteMatch();

  const { setSubMenu } = useMenus();
  const { getGameInfo } = useGame();

  useEffect(() => {
    setSubMenu("MODIFY_GAME");
    getGameInfo((match.params as Params).id);
  }, []);

  return (
    <div className="d-flex h-100">
      <NewGame />
    </div>
  );
};

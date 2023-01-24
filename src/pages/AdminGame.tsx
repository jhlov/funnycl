import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useMenus } from "store/useMenus";
import { AdminGameCreate } from "./AdminGameCreate";
import { AdminGameList } from "./AdminGameList";
import { AdminGameModify } from "./AdminGameModify";

const AdminGame = () => {
  const { setMainMenu } = useMenus();

  useEffect(() => {
    setMainMenu("GAME");
  }, []);

  return (
    <>
      <Route path="/admin/game" exact>
        <Redirect to="/admin/game/list" />
      </Route>
      <Route path="/admin/game/list" component={AdminGameList} />
      <Route path="/admin/game/create" component={AdminGameCreate} />
      <Route path="/admin/game/modify/:id" component={AdminGameModify} />
    </>
  );
};

export { AdminGame };

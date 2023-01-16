import { NewGame } from "components/admin/game/NewGame";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useGame } from "store/useGame";
import { useMenus } from "store/useMenus";

const AdminGameCreate = () => {
  const { setSubMenu } = useMenus();
  const { newGame, initNewGame, setNewGame } = useGame();

  useEffect(() => {
    setSubMenu("CREATE_GAME");
    initNewGame();
  }, []);

  return (
    <>
      {newGame.type === "NONE" ? (
        <div className="p-5">
          <h1 className="mb-5">새로운 게임을 만들어 보세요.</h1>
          <div>
            <Button
              className="me-3"
              variant="primary"
              size="lg"
              onClick={() => setNewGame("type", "숨겨진그림")}
            >
              숨겨진 그림
            </Button>
          </div>
        </div>
      ) : (
        <div className="d-flex h-100">
          <NewGame />
        </div>
      )}
    </>
  );
};

export { AdminGameCreate };

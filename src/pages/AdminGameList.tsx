import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import moment from "moment";
import { useEffect } from "react";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGame } from "store/useGame";
import { useMenus } from "store/useMenus";
import "./AdminQuizList.scss";

export const AdminGameList = () => {
  const auth = getAuth();
  const { setSubMenu } = useMenus();
  const { gameList, getGameList } = useGame();

  useEffect(() => {
    setSubMenu("GAME_LIST");
    getGameList();
  }, []);

  const onClickRemoveQuiz = (id: string) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const db = getDatabase();

      const updates: any = {};
      updates[`game/all/${id}/deleted`] = moment()
        .utc(false)
        .add(9, "h")
        .format("YYYY-MM-DD HH:mm:ss");
      updates[`game/${auth.currentUser?.uid}/${id}/deleted`] = moment()
        .utc(false)
        .add(9, "h")
        .format("YYYY-MM-DD HH:mm:ss");

      update(ref(db), updates).then(() => {
        getGameList();
      });
    }
  };

  return (
    <div className="admin-quiz-list p-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "40px" }}>#</th>
            <th style={{ width: "120px" }}>타입</th>
            <th>게임 이름</th>
            <th>이미지</th>
            <th>그림 정답</th>
            <th style={{ width: "120px" }}>생성일</th>
            <th style={{ width: "120px" }}>수정일</th>
            <th style={{ width: "80px" }}>플레이</th>
            <th style={{ width: "60px", minWidth: "60px" }}>수정</th>
            <th style={{ width: "80px" }}>삭제</th>
          </tr>
        </thead>
        <tbody>
          {gameList.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.type}</td>
              <td className="text-start">{item.title}</td>
              <td>
                {item.image && (
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id={`image-tooltip-${item.id}`}>
                        <img
                          style={{ maxWidth: "500px" }}
                          src={item.image as string}
                        />
                      </Tooltip>
                    }
                  >
                    <img
                      className="admin-quiz-list__image"
                      src={item.image as string}
                    />
                  </OverlayTrigger>
                )}
              </td>
              <td>
                {item.type === "숨겨진그림" ? item.hiddenPictureAnswer : ""}
              </td>
              <td>{item.created}</td>
              <td>{item.modified}</td>
              <td>
                <Link to={`/play/${item.id}`} target="_blank">
                  <PlayArrowIcon />
                </Link>
              </td>
              <td>
                <Link className="btn" to={`/admin/game/modify/${item.id}`}>
                  <EditIcon />
                </Link>
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() => onClickRemoveQuiz(item.id!)}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

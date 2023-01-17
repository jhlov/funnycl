import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGame } from "store/useGame";
import { useMenus } from "store/useMenus";
import "./AdminQuizList.scss";

export const AdminGameList = () => {
  const { setSubMenu } = useMenus();
  const { gameList, getGameList } = useGame();

  useEffect(() => {
    setSubMenu("GAME_LIST");
    getGameList();
  }, []);

  return (
    <div className="admin-quiz-list p-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "40px" }}>#</th>
            <th style={{ width: "120px" }}>타입</th>
            <th>게임 이름</th>
            <th style={{ width: "100px" }}>크기</th>
            <th style={{ width: "120px" }}>모둠수</th>
            <th>설정</th>
            <th style={{ width: "120px" }}>생성일</th>
            <th style={{ width: "80px" }}>플레이</th>
          </tr>
        </thead>
        <tbody>
          {gameList.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.type}</td>
              <td className="text-start">{item.title}</td>
              <td>{`${item.sizeX} x ${item.sizeY}`}</td>
              <td>{item.groupCount}</td>
              <td>
                {item.isPlaySetting
                  ? "게임 시작 할 때, 게임 범위 설정"
                  : `과목:${item.subject} / 과정:${item.yearStart}~${item.yearEnd} / 난이도:${item.difficultyStart}~${item.difficultyEnd}`}
              </td>
              <td>{item.created}</td>
              <td>
                <Link to={`/play/${item.id}`} target="_blank">
                  <PlayArrowIcon />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

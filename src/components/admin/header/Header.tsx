import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { useGame } from "store/useGame";
import { useLogin } from "store/useLogin";
import { useMenus } from "store/useMenus";
import { useQuiz } from "store/useQuiz";
import "./Header.scss";
import { SaveGameButton } from "./SaveGameButton";
import { SaveQuizButton } from "./SaveQuizButton";

const Header = () => {
  const auth = getAuth();
  const { isLogin } = useLogin();
  const { subMenu } = useMenus();
  const { newQuiz } = useQuiz();
  const { newGame } = useGame();

  return (
    <div className="header px-3 py-2 border-bottom align-items-center">
      <div>퍼니클</div>
      <div className="d-flex align-items-center">
        {subMenu === "CREATE_QUIZ" && newQuiz.type !== "NONE" && (
          <div className="me-5">
            <SaveQuizButton />
          </div>
        )}

        {subMenu === "CREATE_GAME" && newGame.type !== "NONE" && (
          <div className="me-5">
            <SaveGameButton />
          </div>
        )}

        {subMenu === "GAME_LIST" && (
          <div className="me-3">
            <Link className="btn btn-primary btn-sm" to="/admin/game/create">
              새로운 게임 만들기
            </Link>
          </div>
        )}

        {subMenu === "QUIZ_LIST" && (
          <div className="me-3">
            <Link className="btn btn-primary btn-sm" to="/admin/quiz/create">
              새로운 문제 만들기
            </Link>
          </div>
        )}
        <div className="me-3">{auth.currentUser?.email}</div>
        {isLogin && (
          <div className="logout-button" onClick={() => auth.signOut()}>
            <LogoutIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export { Header };

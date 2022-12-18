import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { useLogin } from "store/useLogin";
import { useMenus } from "store/useMenus";
import "./Header.scss";

const Header = () => {
  const auth = getAuth();
  const { isLogin } = useLogin();
  const { subMenu } = useMenus();

  return (
    <div className="header px-3 py-2 border-bottom align-items-center">
      <div>퍼니클</div>
      <div className="d-flex align-items-center">
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

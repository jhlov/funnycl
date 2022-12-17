import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth } from "firebase/auth";
import { useLogin } from "store/useLogin";
import "./Header.scss";

const Header = () => {
  const auth = getAuth();
  const { isLogin } = useLogin();

  return (
    <div className="header px-3 py-2 border-bottom">
      <div>퍼니클</div>
      <div className="d-flex">
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

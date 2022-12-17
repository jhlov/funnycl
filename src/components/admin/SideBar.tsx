import AppsIcon from "@mui/icons-material/Apps";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useMenus } from "store/useMenus";
import "./SideBar.scss";

const SideBar = () => {
  const { mainMenu, setMainMenu } = useMenus();

  return (
    <div className="side-bar border-end">
      <Link
        className={classNames("main-menu-button p-3", {
          active: mainMenu === "game"
        })}
        to="/admin/game"
      >
        <AppsIcon fontSize="large" />
        <div>게임</div>
      </Link>
      <Link
        className={classNames("main-menu-button p-3", {
          active: mainMenu === "quiz"
        })}
        to="/admin/quiz"
      >
        <ArticleOutlinedIcon fontSize="large" />
        <div>문제</div>
      </Link>
    </div>
  );
};

export { SideBar };

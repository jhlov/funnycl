import AppsIcon from "@mui/icons-material/Apps";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import classNames from "classnames";
import { useMenus } from "store/useMenus";
import "./SideBar.scss";

const SideBar = () => {
  const { mainMenu, setMainMenu } = useMenus();

  return (
    <div className="side-bar border-end">
      <div
        className={classNames("main-menu-button p-3", {
          active: mainMenu === "game"
        })}
        onClick={() => setMainMenu("game")}
      >
        <AppsIcon fontSize="large" />
        <div>게임</div>
      </div>
      <div
        className={classNames("main-menu-button p-3", {
          active: mainMenu === "quiz"
        })}
        onClick={() => setMainMenu("quiz")}
      >
        <ArticleOutlinedIcon fontSize="large" />
        <div>문제</div>
      </div>
    </div>
  );
};

export { SideBar };

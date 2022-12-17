import AppsIcon from "@mui/icons-material/Apps";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import "./SideBar.scss";

const SideBar = () => {
  return (
    <div className="side-bar border-end p-3">
      <div className="main-menu-button">
        <AppsIcon fontSize="large" />
        <div>게임</div>
      </div>
      <div className="main-menu-button">
        <ArticleOutlinedIcon fontSize="large" />
        <div>문제</div>
      </div>
    </div>
  );
};

export { SideBar };

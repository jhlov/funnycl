import { Header } from "components/admin/Header";
import { SideBar } from "components/admin/SideBar";
import "./Admin.scss";

const Admin = () => {
  return (
    <div className="admin">
      <Header />
      <div className="d-flex admin-body">
        <SideBar />
        <div>서브</div>
      </div>
    </div>
  );
};

export { Admin };

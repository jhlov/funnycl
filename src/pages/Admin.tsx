import { Header } from "components/admin/Header";
import { SideBar } from "components/admin/SideBar";

const Admin = () => {
  return (
    <div>
      <Header />
      <div className="d-flex">
        <SideBar />
        <div>서브</div>
      </div>
    </div>
  );
};

export { Admin };

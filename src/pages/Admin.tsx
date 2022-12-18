import { Header } from "components/admin/Header";
import { SideBar } from "components/admin/SideBar";
import { Link, Redirect, Route } from "react-router-dom";
import { useLogin } from "store/useLogin";
import "./Admin.scss";
import { AdminGame } from "./AdminGame";
import { AdminQuiz } from "./AdminQuiz";

const Admin = () => {
  const { isLogin } = useLogin();

  return (
    <div className="admin">
      {isLogin ? (
        <>
          <Header />
          <div className="d-flex admin-body">
            <SideBar />
            <div className="flex-fill">
              <Route path="/admin" exact>
                <Redirect to="/admin/game" />
              </Route>
              <Route path="/admin/game" component={AdminGame}></Route>
              <Route path="/admin/quiz" component={AdminQuiz}></Route>
            </div>
          </div>
        </>
      ) : (
        <div className="p-5">
          <div className="pb-3">로그인이 필요합니다.</div>
          <Link to="/login">로그인 페이지로 가기</Link>
        </div>
      )}
    </div>
  );
};

export { Admin };

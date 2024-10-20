import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useMenus } from "store/useMenus";
import { AdminQuizCreate } from "./AdminQuizCreate";
import { AdminQuizList } from "./AdminQuizList";
import { AdminQuizModify } from "./AdminQuizModify";

const AdminQuiz = () => {
  const { setMainMenu } = useMenus();

  useEffect(() => {
    setMainMenu("QUIZ");
  }, []);

  return (
    <>
      <Route path="/admin/quiz" exact>
        <Redirect to="/admin/quiz/list" />
      </Route>
      <Route path="/admin/quiz/list" component={AdminQuizList} />
      <Route path="/admin/quiz/create" component={AdminQuizCreate} />
      <Route
        path="/admin/quiz/modify/:userId/:id"
        component={AdminQuizModify}
      />
    </>
  );
};

export { AdminQuiz };

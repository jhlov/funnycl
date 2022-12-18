import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useMenus } from "store/useMenus";
import { AdminQuizList } from "./AdminQuizList";

const AdminQuiz = () => {
  const { setMainMenu } = useMenus();

  useEffect(() => {
    setMainMenu("quiz");
  });

  return (
    <>
      <Route path="/admin/quiz" exact>
        <Redirect to="/admin/quiz/list" />
      </Route>
      <Route path="/admin/quiz/list" component={AdminQuizList}></Route>
    </>
  );
};

export { AdminQuiz };

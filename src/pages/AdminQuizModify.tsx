import { NewQuizContent } from "components/admin/quiz/NewQuizContent";
import { NewQuizInfo } from "components/admin/quiz/NewQuizInfo";
import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useMenus } from "store/useMenus";
import { useQuiz } from "store/useQuiz";

interface Params {
  userId: string;
  id: string;
}

export const AdminQuizModify = () => {
  const match = useRouteMatch();

  const { setSubMenu } = useMenus();
  const { getQuizInfo } = useQuiz();

  useEffect(() => {
    setSubMenu("MODIFY_QUIZ");
    getQuizInfo((match.params as Params).userId, (match.params as Params).id);
  }, []);

  return (
    <div className="d-flex h-100">
      <NewQuizContent />
      <NewQuizInfo />
    </div>
  );
};

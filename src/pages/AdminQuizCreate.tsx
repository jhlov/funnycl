import { NewQuizContent } from "components/admin/quiz/NewQuizContent";
import { NewQuizInfo } from "components/admin/quiz/NewQuizInfo";
import { QuizList } from "components/admin/quiz/QuizList";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useMenus } from "store/useMenus";
import { useQuiz } from "store/useQuiz";

const AdminQuizCreate = () => {
  const { setSubMenu } = useMenus();
  const { newQuiz, initNewQuiz, setNewQuiz } = useQuiz();

  useEffect(() => {
    setSubMenu("CREATE_QUIZ");
    initNewQuiz();
  }, []);

  return (
    <>
      {newQuiz.type === "NONE" ? (
        <div className="p-5">
          <h1 className="mb-5">새로운 문제를 만들어 보세요.</h1>
          <div>
            <Button
              className="me-3"
              variant="primary"
              size="lg"
              onClick={() => setNewQuiz("type", "일반")}
              disabled
            >
              일반 문제
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setNewQuiz("type", "워크시트")}
            >
              워크 시트
            </Button>
          </div>
        </div>
      ) : (
        <div className="d-flex h-100">
          <QuizList />
          <NewQuizContent />
          <NewQuizInfo />
        </div>
      )}
    </>
  );
};

export { AdminQuizCreate };

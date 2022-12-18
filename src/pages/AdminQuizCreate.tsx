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
    <div>
      {newQuiz.type === "NONE" ? (
        <>
          <h1 className="mb-5">새로운 문제를 만들어 보세요.</h1>
          <div>
            <Button
              className="me-3"
              variant="primary"
              size="lg"
              onClick={() => setNewQuiz("type", "NORMAL")}
            >
              일반 문제
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setNewQuiz("type", "WORK_SHEET")}
            >
              워크 시트
            </Button>
          </div>
        </>
      ) : (
        <h1>ㄴㄴ</h1>
      )}
    </div>
  );
};

export { AdminQuizCreate };

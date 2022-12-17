import { useEffect } from "react";
import { useMenus } from "store/useMenus";

const AdminQuiz = () => {
  const { setMainMenu } = useMenus();

  useEffect(() => {
    setMainMenu("quiz");
  });

  return <div>퀴즈</div>;
};

export { AdminQuiz };

import React, { useMemo } from "react";
import { Quiz } from "types";

interface Props {
  index: number;
  quiz: Quiz;
}

const QuizItem = (props: Props) => {
  const quizType = useMemo(() => {
    return `${props.quiz.example ? "객관식" : "주관식"} ${props.quiz.score}점`;
  }, [props]);

  return (
    <div className="quiz-item">
      <div className="quiz-type">{quizType}</div>
      <div className="quiz-number">{props.index + 1}</div>
    </div>
  );
};

export { QuizItem };

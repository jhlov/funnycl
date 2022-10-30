import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import quizImg from "assets/quiz1.jpg";
import { ShortAnswerQuestion } from "components/ShortAnswerQuestion";
import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./CreateQuiz.scss";

type QuizType = "NONE" | "SHORT_ANSWER_QUESTION" | "MULTIPLE_CHOICE";

const CreateQuiz = () => {
  const [quizType, setQuizType] = useState<QuizType>("NONE");
  const [shortAnswerQuestionInfo, setShortAnswerQuestionInfo] =
    useState<ShortAnswerQuestionInfo | null>(null);

  const onClickType = (type: QuizType) => {
    setQuizType(type);
  };

  const onClickImg = (e: React.MouseEvent) => {
    const x =
      e.clientX -
      ((e.target as HTMLElement).offsetParent as HTMLElement).offsetLeft;
    const y =
      e.clientY -
      ((e.target as HTMLElement).offsetParent as HTMLElement).offsetTop;
    console.log("onClickImg", x, y);

    if (quizType === "SHORT_ANSWER_QUESTION") {
      if (!shortAnswerQuestionInfo) {
        setShortAnswerQuestionInfo({
          offsetLeft: ((e.target as HTMLElement).offsetParent as HTMLElement)
            .offsetLeft,
          offsetTop: ((e.target as HTMLElement).offsetParent as HTMLElement)
            .offsetTop,
          x,
          y,
          width: 100,
          height: 30,
          answer: ""
        });
      }
    }
  };

  return (
    <div className="create-quiz">
      <div className="create-quiz-info mt-2 mb-4">
        <Form.Group className="create-quiz-info-title  me-2">
          <Form.Label className="d-block text-start mb-0">문제 이름</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <div className="quiz-types">
          <button
            className="type-btn"
            onClick={() => onClickType("SHORT_ANSWER_QUESTION")}
            disabled={quizType === "SHORT_ANSWER_QUESTION"}
          >
            <FormatShapesIcon />
          </button>

          <button
            className="type-btn"
            onClick={() => onClickType("MULTIPLE_CHOICE")}
            disabled={quizType === "MULTIPLE_CHOICE"}
          >
            <RadioButtonCheckedIcon />
          </button>
        </div>
      </div>

      <div className="create-quiz-img-wrapper">
        <img src={quizImg} onClick={onClickImg} />
        {shortAnswerQuestionInfo && (
          <ShortAnswerQuestion
            shortAnswerQuestionInfo={shortAnswerQuestionInfo}
            onChangeShortAnswerQuestionInfo={(info: ShortAnswerQuestionInfo) =>
              setShortAnswerQuestionInfo(info)
            }
          />
        )}
      </div>
    </div>
  );
};

export { CreateQuiz };

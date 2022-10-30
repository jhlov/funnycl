import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import quizImg from "assets/quiz1.jpg";
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

  const onChangeshortAnswerQuestionAnswer = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShortAnswerQuestionInfo({
      ...shortAnswerQuestionInfo!,
      answer: e.target.value
    });
  };

  const onDragStartShortAnswerQuestionAnswer = (e: React.DragEvent) => {
    const img = new Image(0, 0);
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const onDragShortAnswerQuestionAnswer = (e: React.DragEvent) => {
    console.log((e.target as HTMLElement).offsetLeft);
    if (e.clientX && e.clientY) {
      setShortAnswerQuestionInfo({
        ...shortAnswerQuestionInfo!,
        x: e.clientX - shortAnswerQuestionInfo!.offsetLeft + 4,
        y: e.clientY - shortAnswerQuestionInfo!.offsetTop + 4
      });
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
          <div
            className="short-answer-question-info"
            style={{
              left: shortAnswerQuestionInfo.x,
              top: shortAnswerQuestionInfo.y
            }}
          >
            <div
              draggable
              className="short-answer-question-info-move"
              onDragStart={onDragStartShortAnswerQuestionAnswer}
              onDrag={onDragShortAnswerQuestionAnswer}
              // onDragEnter={e => console.log(e)}
              onDragOver={e => e.preventDefault()}
              // onDragEnd={e => console.log(e)}
            >
              <OpenWithIcon fontSize="small" />
            </div>
            <input
              type="text"
              style={{
                width: shortAnswerQuestionInfo.width,
                height: shortAnswerQuestionInfo.height
              }}
              value={shortAnswerQuestionInfo.answer}
              onChange={onChangeshortAnswerQuestionAnswer}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export { CreateQuiz };

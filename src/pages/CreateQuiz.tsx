import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import quizImg from "assets/quiz1.jpg";
import { ShortAnswerQuestion } from "components/ShortAnswerQuestion";
import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";
import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./CreateQuiz.scss";

type QuizType = "NONE" | "SHORT_ANSWER_QUESTION" | "MULTIPLE_CHOICE";

const CreateQuiz = () => {
  const [quizType, setQuizType] = useState<QuizType>("NONE");
  const [shortAnswerQuestionInfo, setShortAnswerQuestionInfo] =
    useState<ShortAnswerQuestionInfo | null>(null);
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };

    reader.readAsDataURL(e.target.files[0]);

    setImage(e.target.files[0]);
  };

  const onUploadImageButtonClick = () => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.click();
  };

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

        <div className="quiz-types me-2">
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

        <div className="add-image-button">
          <input
            className="d-none"
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onUploadImage}
          />
          <Button onClick={onUploadImageButtonClick}>이미지 업로드</Button>
        </div>
      </div>

      <div className="create-quiz-img-wrapper">
        <img src={quizImg} onClick={onClickImg} />
        {shortAnswerQuestionInfo && (
          <ShortAnswerQuestion
            index={0}
            info={shortAnswerQuestionInfo}
            onChange={(info: ShortAnswerQuestionInfo) =>
              setShortAnswerQuestionInfo(info)
            }
            onRemove={() => setShortAnswerQuestionInfo(null)}
          />
        )}
      </div>

      <img src={imageUrl} />
    </div>
  );
};

export { CreateQuiz };

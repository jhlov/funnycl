import classNames from "classnames";
import { ShortAnswerQuestion } from "components/ShortAnswerQuestion";
import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";
import _ from "lodash";
import { useEffect, useMemo, useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useQuiz } from "store/useQuiz";
import "./NewQuizContent.scss";

const NewQuizContent = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { quizList, getQuizList, newQuiz, setNewQuiz } = useQuiz();

  useEffect(() => {
    getQuizList();
  }, []);

  const quizTitleError = useMemo(() => {
    if (
      newQuiz.title &&
      0 < quizList.filter(item => item.title === newQuiz.title).length
    ) {
      return "동일한 이름의 문제가 존재합니다.";
    }
  }, [quizList, newQuiz.title]);

  const onLoadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setNewQuiz("imageUrl", reader.result as string);
    };

    reader.readAsDataURL(e.target.files[0]);
    setNewQuiz("image", e.target.files[0]);
    setNewQuiz("imageName", e.target.value);
  };

  const onClickAddImage = () => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.click();
  };

  const onClickRemoveImage = () => {
    setNewQuiz("image", null);
    setNewQuiz("imageName", "");
    setNewQuiz("imageUrl", "");
  };

  const onClickImg = (e: React.MouseEvent) => {
    const x =
      e.pageX -
      ((e.target as HTMLElement).offsetParent as HTMLElement).offsetLeft;
    const y =
      e.pageY -
      ((e.target as HTMLElement).offsetParent as HTMLElement).offsetTop;
    console.log("onClickImg", x, y);

    if (newQuiz.answerType === "단답형") {
      if (_.isNil(newQuiz.shortAnswerQuestionInfo)) {
        setNewQuiz("shortAnswerQuestionInfo", {
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
    <div className="new-quiz-content flex-fill border-end  p-3">
      <Form className="text-start">
        <Form.Group className="mb-4">
          <Form.Label>문제 이름</Form.Label>
          <Row>
            <Col xs="6">
              <Form.Control
                type="text"
                value={newQuiz.title}
                onChange={e => setNewQuiz("title", e.target.value)}
              />
              <Form.Text
                className={classNames({ "text-danger": quizTitleError })}
              >
                {quizTitleError}
              </Form.Text>
            </Col>
          </Row>
        </Form.Group>

        {newQuiz.image ? (
          <div className="d-flex">
            <div className="me-2">{newQuiz.imageName}</div>
            <Button variant="primary" size="sm" onClick={onClickRemoveImage}>
              이미지 제거
            </Button>
          </div>
        ) : (
          <Button variant="primary" size="sm" onClick={onClickAddImage}>
            <input
              className="d-none"
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={onLoadImage}
            />
            이미지 추가
          </Button>
        )}
      </Form>

      {newQuiz.image && (
        <div className="new-quiz-image-wrapper mt-5">
          <img src={newQuiz.imageUrl} onClick={onClickImg} />
          {newQuiz.shortAnswerQuestionInfo && (
            <ShortAnswerQuestion
              index={0}
              info={newQuiz.shortAnswerQuestionInfo}
              onChange={(info: ShortAnswerQuestionInfo) =>
                setNewQuiz("shortAnswerQuestionInfo", info)
              }
              onRemove={() => setNewQuiz("shortAnswerQuestionInfo", null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export { NewQuizContent };

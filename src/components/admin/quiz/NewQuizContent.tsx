import classNames from "classnames";
import { ImageInput } from "components/common/ImageInput";
import { ShortAnswerQuestion } from "components/ShortAnswerQuestion";
import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";
import _ from "lodash";
import { useEffect, useMemo } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useQuiz } from "store/useQuiz";
import "./NewQuizContent.scss";

interface Params {
  id: string;
}

const NewQuizContent = () => {
  const { quizList, getQuizList, newQuiz, setNewQuiz, modifyQuizId } =
    useQuiz();

  useEffect(() => {
    getQuizList();
  }, []);

  const quizTitleError = useMemo(() => {
    if (
      newQuiz.title &&
      0 <
        quizList.filter(
          item => item.id !== modifyQuizId && item.title === newQuiz.title
        ).length
    ) {
      return "동일한 이름의 문제가 존재합니다.";
    }
  }, [quizList, newQuiz.title, modifyQuizId]);

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

        <ImageInput
          image={newQuiz.image}
          onChangeImage={v => setNewQuiz("image", v)}
          onChangeImageUrl={v => setNewQuiz("imageUrl", v)}
        />
      </Form>

      {newQuiz.image && (
        <div className="new-quiz-image-wrapper mt-5">
          <img
            src={
              typeof newQuiz.image === "string"
                ? newQuiz.image
                : newQuiz.imageUrl
            }
            onClick={onClickImg}
          />
          {newQuiz.shortAnswerQuestionInfo && (
            <ShortAnswerQuestion
              index={0}
              info={newQuiz.shortAnswerQuestionInfo}
              answer={newQuiz.shortAnswerQuestionInfo.answer}
              onChange={(info: ShortAnswerQuestionInfo) =>
                setNewQuiz("shortAnswerQuestionInfo", info)
              }
              onRemove={() => setNewQuiz("shortAnswerQuestionInfo", null)}
              isEditable={true}
            />
          )}
        </div>
      )}
    </div>
  );
};

export { NewQuizContent };

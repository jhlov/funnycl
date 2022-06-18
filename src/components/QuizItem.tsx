import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Quiz } from "types";
import "./QuizItem.scss";

interface Props {
  index: number;
  quiz: Quiz;
}

const QuizItem = (props: Props) => {
  const [finished, setFinished] = useState(false);
  const [show, setShow] = useState<boolean>(false);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    if (show) {
      setAnswer("");
    }
  }, [show]);

  const quizType = useMemo(() => {
    return `${props.quiz.example ? "객관식" : "주관식"} ${props.quiz.score}점`;
  }, [props]);

  const onClick = () => {
    if (!finished) {
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCloseResult = () => {
    if (props.quiz.answer === answer) {
      setFinished(true);
    }
    setResult("");
  };

  const onSubmit = () => {
    handleClose();
    setTimeout(() => {
      if (props.quiz.answer === answer) {
        setResult("정답입니다.!!!");
      } else {
        setResult("오답입니다");
      }
    }, 200);
  };

  return (
    <>
      <div
        className={classNames("quiz-item", { finished: finished })}
        onClick={onClick}
      >
        {!finished && (
          <>
            <div className="quiz-type">{quizType}</div>
            <div className="quiz-number">{props.index + 1}</div>
          </>
        )}
      </div>

      <Modal className="quiz-modal" size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {`${props.index + 1}번 문제`}{" "}
            <small className="ms-1">
              ({`${props.quiz.score}점`}
              {props.quiz.bonus ? " x2!!!!" : ""})
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="question mb-4">{props.quiz.question}</div>
          {props.quiz.example ? (
            <div className="example-list mb-5">
              {props.quiz.example.map(ex => (
                <div
                  key={ex}
                  className={classNames("example", { checked: ex === answer })}
                  onClick={() => setAnswer(ex)}
                >
                  {ex}
                </div>
              ))}
            </div>
          ) : (
            <div className="d-flex justify-content-center mb-5">
              <Form.Control
                className="answer"
                size="lg"
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={onSubmit} disabled={!answer}>
            정답 제출
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="quiz-result-modal"
        size="lg"
        show={!!result}
        onHide={handleCloseResult}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>{result}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseResult}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { QuizItem };

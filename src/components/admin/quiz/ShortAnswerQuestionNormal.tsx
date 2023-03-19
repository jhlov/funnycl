import classNames from "classnames";
import { Col, Form, Row } from "react-bootstrap";
import { useQuiz } from "store/useQuiz";

// 일반문제, 단답형
export const ShortAnswerQuestionNormal = () => {
  const { newQuiz, setNewQuiz } = useQuiz();

  return (
    <div>
      <Form.Group className="mb-4">
        <Form.Label>정답</Form.Label>
        <Row>
          <Col xs="6">
            <Form.Control
              type="text"
              className={classNames({
                "border-danger": !newQuiz.shortAnswerQuestionInfo?.answer
              })}
              value={newQuiz.shortAnswerQuestionInfo?.answer ?? ""}
              onChange={e =>
                setNewQuiz("shortAnswerQuestionInfo", {
                  x: 0,
                  y: 0,
                  width: 0,
                  height: 0,
                  answer: e.target.value
                })
              }
            />
          </Col>
        </Row>
      </Form.Group>
    </div>
  );
};

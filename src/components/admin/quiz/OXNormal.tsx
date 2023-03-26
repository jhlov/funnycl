import { ButtonGroup, Col, Form, Row, ToggleButton } from "react-bootstrap";
import { useQuiz } from "store/useQuiz";

export const OXNormal = () => {
  const { newQuiz, setNewQuiz } = useQuiz();

  return (
    <div className="ox-normal">
      <Form.Group className="mb-4">
        <Form.Label>정답</Form.Label>
        <Row>
          <Col xs="6">
            <ButtonGroup className="mb-2">
              <ToggleButton
                id="ox-normal__o"
                type="checkbox"
                variant="outline-primary"
                checked={newQuiz.oxAnswer}
                value="true"
                onChange={e => setNewQuiz("oxAnswer", true)}
              >
                O
              </ToggleButton>
              <ToggleButton
                id="ox-normal__x"
                type="checkbox"
                variant="outline-primary"
                checked={!newQuiz.oxAnswer}
                value="false"
                onChange={e => setNewQuiz("oxAnswer", false)}
              >
                X
              </ToggleButton>
            </ButtonGroup>
          </Col>
        </Row>
      </Form.Group>
    </div>
  );
};

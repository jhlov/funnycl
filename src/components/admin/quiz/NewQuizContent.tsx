import { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useQuiz } from "store/useQuiz";
import "./NewQuizContent.scss";

const NewQuizContent = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { newQuiz, setNewQuiz } = useQuiz();

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

  return (
    <div className="new-quiz-content flex-fill border-end  p-3">
      <Form className="text-start">
        <Form.Group className="mb-4">
          <Form.Label>문제 이름</Form.Label>
          <Row>
            <Col xs="6">
              <Form.Control type="text" />
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
        <div className="new-quiz-image-wrapper mt-2">
          <img src={newQuiz.imageUrl} />
        </div>
      )}
    </div>
  );
};

export { NewQuizContent };

import KeyIcon from "@mui/icons-material/Key";
import { Group } from "interfaces/Group";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { usePlay } from "store/usePlay";
import "./PlayHiddenPictureScoreItem.scss";

interface Props {
  group: Group;
}

export const PlayHiddenPictureScoreItem = (props: Props) => {
  const [show, setShow] = useState(false);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");

  const { gameInfo, quizList, updateGroupListKey } = usePlay();

  const onClickKey = () => {
    setAnswer("");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const onSubmit = () => {
    handleClose();

    setTimeout(() => {
      updateGroupListKey(props.group.name, -1);
      if (gameInfo?.hiddenPictureAnswer === answer) {
        setResult(`정답입니다.!!\n\n게임 승리 ${props.group.name}`);
      } else {
        setResult("오답입니다");
      }
    }, 200);
  };

  const handleCloseResult = () => {
    setResult("");
  };

  return (
    <>
      <div
        className={`play-hidden-picture-score-item mb-1 ${props.group.color}`}
      >
        <div>
          <span>
            {props.group.name}

            {0 < (props.group.key ?? 0) && (
              <span className="ms-2">
                <small>
                  <KeyIcon
                    className="play-hidden-picture-score-item__key"
                    onClick={onClickKey}
                  />
                  {`x${props.group.key}`}
                </small>
              </span>
            )}
          </span>
        </div>

        <span className="play-hidden-picture-score-item__score">
          {props.group.score}점
        </span>
      </div>

      <Modal className="pb-3" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.group.name} 그림 정답 도전</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label>그림 정답</Form.Label>
              <Form.Control
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
              />
            </Form.Group>
          </Form>
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
        className="play-hidden-picture-score-item__result-modal pb-3"
        size="lg"
        show={!!result}
        onHide={handleCloseResult}
        centered
      >
        <Modal.Header closeButton />
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

import { HiddenPictureAnswerModal } from "components/modals/HiddenPictureAnswerModal";
import { Group } from "interfaces/Group";
import { ItemType } from "interfaces/Items";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { usePlay } from "store/usePlay";
import "./PlayHiddenPictureScoreItem.scss";

interface Props {
  group: Group;
  groupIndex: number;
}

export const PlayHiddenPictureScoreItem = (props: Props) => {
  const [show, setShow] = useState(false);
  const [result, setResult] = useState("");

  const { gameInfo, turn, updateGroupListItem } = usePlay();

  const onClickItem = (item: ItemType) => {
    if (item === "KEY") {
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const onSubmit = (answer: string) => {
    handleClose();

    setTimeout(() => {
      updateGroupListItem(props.group.name, "KEY", -1);
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

            {0 < (props.group.items["KEY"] ?? 0) && (
              <span
                className="play-hidden-picture-score-item__reward ms-2"
                onClick={() => onClickItem("KEY")}
              >
                <img src={`${process.env.PUBLIC_URL}/img/items/icon_key.png`} />
                <small>{`x${props.group.items["KEY"]}`}</small>
              </span>
            )}
          </span>
        </div>

        <span className="play-hidden-picture-score-item__score">
          {props.group.score}점
        </span>

        {gameInfo?.isTurnPlay && turn === props.groupIndex && (
          <img
            className="play-hidden-picture-score-item__my-turn"
            src={`${process.env.PUBLIC_URL}/img/score/icon_mylocation.png`}
          />
        )}
      </div>

      <HiddenPictureAnswerModal
        show={show}
        groupName={props.group.name}
        onSubmit={onSubmit}
        onClose={handleClose}
      />

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

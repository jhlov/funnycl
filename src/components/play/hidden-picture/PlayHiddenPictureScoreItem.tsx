import { HiddenPictureAnswerModal } from "components/modals/HiddenPictureAnswerModal";
import { QuizFailModal } from "components/modals/QuizFailModal";
import { Group } from "interfaces/Group";
import { ItemType } from "interfaces/Items";
import { useState } from "react";
import { usePlay } from "store/usePlay";
import "./PlayHiddenPictureScoreItem.scss";

interface Props {
  group: Group;
  groupIndex: number;
}

export const PlayHiddenPictureScoreItem = (props: Props) => {
  const [show, setShow] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);

  const {
    gameInfo,
    turn,
    finished,
    updateGroupListItem,
    setGameWinModalProps
  } = usePlay();

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
        setGameWinModalProps({
          show: true,
          group: props.group
        });
      } else {
        setShowFailModal(true);
      }
    }, 200);
  };

  const onDoubleClick = () => {
    updateGroupListItem(props.group.name, "KEY", 1);
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

        <span
          className="play-hidden-picture-score-item__score"
          onDoubleClick={onDoubleClick}
        >
          {props.group.score}점
        </span>

        {gameInfo?.isTurnPlay && !finished && turn === props.groupIndex && (
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

      <QuizFailModal
        show={showFailModal}
        onClose={() => setShowFailModal(false)}
      />
    </>
  );
};

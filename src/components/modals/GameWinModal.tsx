import { SliceImage } from "components/common/SliceImage";
import { ImageNormalButton } from "components/image-buttons/ImageNormalButton";
import { Group } from "interfaces/Group";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { usePlay } from "store/usePlay";
import "./CommonModal.scss";
import "./GameWinModal.scss";

export interface GameWinModalProps {
  show: boolean;
  group?: Group;
  onClose?: () => void;
}

export const GameWinModal = (props: GameWinModalProps) => {
  const [groupName, setGroupName] = useState("");

  const { groupList } = usePlay();

  useEffect(() => {
    if (props.group?.name) {
      setGroupName(props.group.name);
    }
  }, [props.group]);

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  const bgUrl = useMemo(() => {
    if (props.group) {
      const index = groupList
        .map(group => group.name)
        .indexOf(props.group.name);
      console.log(index);
      return `${process.env.PUBLIC_URL}/img/popup/bg_popup_paper_${(index + 1)
        .toString()
        .padStart(2, "0")}.png`;
    }

    return "";
  }, [groupList, props.group]);

  return (
    <Modal
      className="game-win-modal common-modal pb-3"
      size="lg"
      show={props.show}
      onHide={handleClose}
      centered
    >
      <Modal.Body>
        <SliceImage
          className="common-modal__bg"
          image={bgUrl}
          top={24}
          right={24}
          bottom={24}
          left={24}
        />

        <div className="position-relative text-center">
          <div className="game-win-modal__group">{`< ${groupName} 승리 >`}</div>
          <img src={`${process.env.PUBLIC_URL}/img/popup/img_victory.png`} />
          <div className="game-win-modal__congratulation">축하합니다!!!</div>
        </div>

        <div className="d-flex justify-content-end column-gap-3 mt-3 pe-4">
          <ImageNormalButton
            className="me-2"
            label="닫기"
            onClick={handleClose}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

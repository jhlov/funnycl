import { ItemType } from "aws-sdk/clients/ssmincidents";
import { CloseButton } from "components/common/CloseButton";
import { SliceImage } from "components/common/SliceImage";
import { ImageNormalButton } from "components/image-buttons/ImageNormalButton";
import { useMemo } from "react";
import { Modal } from "react-bootstrap";
import "./QuizSuccessModal.scss";

export interface SuccessModalProps {
  show: boolean;
  reward?: ItemType;
  rewardText?: string;
  onClose?: () => void;
}

export const QuizSuccessModal = (props: SuccessModalProps) => {
  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  const rewardImg = useMemo(() => {
    if (props.reward === "KEY") {
      return `${process.env.PUBLIC_URL}/img/items/icon_key.png`;
    } else if (props.reward === "KEY_EXCHANGE") {
      return `${process.env.PUBLIC_URL}/img/items/icon_exchange.png`;
    }

    return "";
  }, [props.reward]);

  return (
    <Modal
      className="quiz-success-modal pb-3"
      size="lg"
      show={props.show}
      onHide={handleClose}
      centered
    >
      <Modal.Body>
        <SliceImage
          className="quiz-success-modal__bg"
          image={`${process.env.PUBLIC_URL}/img/popup/bg_popup_paper_00.png`}
          top={24}
          right={24}
          bottom={24}
          left={24}
        />

        <SliceImage
          className="quiz-success-modal__paper"
          image={`${process.env.PUBLIC_URL}/img/popup/img_popup_paper_bg.png`}
          top={24}
          right={24}
          bottom={24}
          left={24}
        />

        <img
          className="quiz-success-modal__spring"
          src={`${process.env.PUBLIC_URL}/img/popup/img_popup_spring.png`}
        />

        <CloseButton onClick={handleClose} />

        <div className="quiz-success-modal__correct">
          <img
            src={
              props.reward && props.reward !== "NONE"
                ? `${process.env.PUBLIC_URL}/img/popup/img_correct_reward.png`
                : `${process.env.PUBLIC_URL}/img/popup/img_correct.png`
            }
          />

          {props.reward && (
            <>
              <img
                className="quiz-success-modal__reward-icon"
                src={rewardImg}
              />
              <div className="quiz-success-modal__reward-text">
                {props.rewardText}
              </div>
            </>
          )}
        </div>

        <div className="d-flex justify-content-center column-gap-3 mt-3">
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

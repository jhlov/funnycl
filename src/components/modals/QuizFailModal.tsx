import { CloseButton } from "components/common/CloseButton";
import { SliceImage } from "components/common/SliceImage";
import { ImageNormalButton } from "components/image-buttons/ImageNormalButton";
import { Modal } from "react-bootstrap";
import "./QuizFailModal.scss";

interface Props {
  show: boolean;
  onClose: () => void;
}

export const QuizFailModal = (props: Props) => {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <Modal
      className="quiz-fail-modal pb-3"
      size="lg"
      show={props.show}
      onHide={handleClose}
      centered
    >
      <Modal.Body>
        <SliceImage
          className="quiz-fail-modal__bg"
          image={`${process.env.PUBLIC_URL}/img/popup/bg_popup_paper_00.png`}
          top={24}
          right={24}
          bottom={24}
          left={24}
        />

        <SliceImage
          className="quiz-fail-modal__paper"
          image={`${process.env.PUBLIC_URL}/img/popup/img_popup_paper_bg.png`}
          top={24}
          right={24}
          bottom={24}
          left={24}
        />

        <img
          className="quiz-fail-modal__spring"
          src={`${process.env.PUBLIC_URL}/img/popup/img_popup_spring.png`}
        />

        <CloseButton onClick={handleClose} />

        <div className="quiz-fail-modal__correct">
          <img src={`${process.env.PUBLIC_URL}/img/popup/img_wrong.png`} />
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

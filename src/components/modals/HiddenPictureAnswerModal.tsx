import { CloseButton } from "components/common/CloseButton";
import { SliceImage } from "components/common/SliceImage";
import { ImageNormalButton } from "components/image-buttons/ImageNormalButton";
import { ImagePrimaryButton } from "components/image-buttons/ImagePrimaryButton";
import { useEffect, useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import "./HiddenPictureAnswerModal.scss";

interface Props {
  show: boolean;
  groupName: string;
  onSubmit: (answer: string) => void;
  onClose: () => void;
}

export const HiddenPictureAnswerModal = (props: Props) => {
  const [answer, setAnswer] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.show) {
      setAnswer("");
      inputRef.current?.focus();
    }
  }, [props.show]);

  const handleClose = () => {
    props.onClose();
  };

  const onSubmit = () => {
    props.onSubmit(answer);
    handleClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter" && e.keyCode === 13) {
      if (answer) {
        onSubmit();
      } else {
        handleClose();
      }
    }
  };

  return (
    <Modal
      className="hidden-picture-answer-modal pb-3"
      size="lg"
      show={props.show}
      onHide={handleClose}
      centered
    >
      <Modal.Body>
        <SliceImage
          className="hidden-picture-answer-modal__bg"
          image={`${process.env.PUBLIC_URL}/img/popup/bg_popup_paper_00.png`}
          top={24}
          right={24}
          bottom={24}
          left={24}
        />

        <SliceImage
          className="hidden-picture-answer-modal__paper"
          image={`${process.env.PUBLIC_URL}/img/popup/img_popup_paper_bg.png`}
          top={24}
          right={24}
          bottom={24}
          left={24}
        />

        <img
          className="hidden-picture-answer-modal__spring"
          src={`${process.env.PUBLIC_URL}/img/popup/img_popup_spring.png`}
        />

        <CloseButton onClick={handleClose} />

        <div className="hidden-picture-answer-modal__title">
          <img
            src={`${process.env.PUBLIC_URL}/img/popup/img_popup_title.png`}
          />
          <div className="hidden-picture-answer-modal__title-text">
            {props.groupName}
          </div>
          <div className="hidden-picture-answer-modal__desc">
            그림 정답 도전!!
          </div>
        </div>

        <div className="hidden-picture-answer-modal__body">
          <div className="hidden-picture-answer-modal__divide" />
          <div className="mb-1">그림 정답을 입력해 주세요~</div>
          <Form
            className="text-start"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <Form.Group className="mb-4">
              <Form.Control
                ref={inputRef}
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                onKeyDown={onKeyDown}
              />
            </Form.Group>
          </Form>
          <div className="hidden-picture-answer-modal__divide" />
        </div>

        <div className="d-flex justify-content-end column-gap-3 mt-3">
          <ImageNormalButton
            className="me-2"
            label="닫기"
            onClick={handleClose}
          />
          <ImagePrimaryButton
            label="정답제출"
            onClick={onSubmit}
            disabled={!answer}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

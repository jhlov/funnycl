import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { SliceImage } from "components/common/SliceImage";
import { ImageNormalButton } from "components/image-buttons/ImageNormalButton";
import { ImagePrimaryButton } from "components/image-buttons/ImagePrimaryButton";
import { ShortAnswerQuestion } from "components/ShortAnswerQuestion";
import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { usePlay } from "store/usePlay";
import "./QuizModal.scss";

interface Props {
  show: boolean;
  index: number;
  onSubmit: (answer: string) => void;
  onClose: () => void;
}

export const QuizModal = (props: Props) => {
  const [answer, setAnswer] = useState("");

  const { quizList, gameInfo, turn, groupList } = usePlay();

  useEffect(() => {
    if (props.show) {
      setAnswer("");
    }
  }, [props.show]);

  const quizInfo = useMemo(() => {
    return quizList[props.index];
  }, [props.index, quizList]);

  const handleClose = () => {
    props.onClose();
  };

  const onSubmit = () => {
    props.onSubmit(answer);
    handleClose();
  };

  return (
    <Modal
      className="quiz-modal pb-3"
      size="lg"
      show={props.show}
      onHide={handleClose}
      centered
    >
      <Modal.Body>
        <SliceImage
          className="quiz-modal__bg"
          image={`${process.env.PUBLIC_URL}/img/popup/bg_popup_paper_00.png`}
          top={24}
          right={24}
          bottom={24}
          left={24}
        />

        <SliceImage
          className="quiz-modal__paper"
          image={`${process.env.PUBLIC_URL}/img/popup/img_popup_paper_bg.png`}
          top={24}
          right={24}
          bottom={24}
          left={24}
        />

        <img
          className="quiz-modal__spring"
          src={`${process.env.PUBLIC_URL}/img/popup/img_popup_spring.png`}
        />

        <div className="quiz-modal__title">
          <img
            src={`${process.env.PUBLIC_URL}/img/popup/img_popup_title.png`}
          />
          <div className="quiz-modal__title-text">
            {gameInfo?.isTurnPlay && `${groupList[turn].name}. `}
            {`${props.index + 1}번 문제`}
          </div>
          <div className="quiz-modal__subject">
            <div className="me-1">
              {`${quizInfo.subject} / ${quizInfo.score ?? 10}점 `}
            </div>
            <div className="quiz-modal__star-icon">
              {Array(Math.floor(Number(quizInfo.difficulty) / 2))
                .fill(0)
                .map((_, i) => (
                  <StarIcon key={`star-${i}`} />
                ))}
              {Array(quizInfo.difficulty % 2)
                .fill(0)
                .map((_, i) => (
                  <StarHalfIcon key={`star-half-${i}`} />
                ))}
            </div>
          </div>
        </div>

        {quizInfo.type === "워크시트" && (
          <div className="position-relative text-center pt-4 pb-5">
            <div className="quiz-modal__image-wrapper">
              <img src={quizInfo.image as string} />
              {quizInfo.answerType === "단답형" && (
                <ShortAnswerQuestion
                  index={0}
                  info={quizInfo.shortAnswerQuestionInfo!}
                  answer={answer}
                  onChange={(info: ShortAnswerQuestionInfo) =>
                    setAnswer(info.answer)
                  }
                  onRemove={() => {}}
                  isEditable={false}
                />
              )}
            </div>
          </div>
        )}

        <div className="d-flex justify-content-end column-gap-3">
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

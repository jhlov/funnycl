import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { CloseButton } from "components/common/CloseButton";
import { SliceImage } from "components/common/SliceImage";
import { ImageNormalButton } from "components/image-buttons/ImageNormalButton";
import { ImagePrimaryButton } from "components/image-buttons/ImagePrimaryButton";
import { ShortAnswerQuestion } from "components/ShortAnswerQuestion";
import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";
import { useEffect, useMemo, useRef, useState } from "react";
import { ButtonGroup, Modal, ToggleButton } from "react-bootstrap";
import { usePlay } from "store/usePlay";
import "./QuizModal.scss";

interface Props {
  show: boolean;
  index: number;
  onSubmit: (groupName: string, answer: string) => void;
  onClose: () => void;
}

export const QuizModal = (props: Props) => {
  const [groupName, setGroupName] = useState("");
  const [answer, setAnswer] = useState("");
  const [imageWidth, setImageWidth] = useState(0);
  const [imageNaturalWidth, setImageNaturalWidth] = useState(0);

  const { quizList, gameInfo, turn, groupList } = usePlay();

  const imageRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.show) {
      if (!gameInfo?.isTurnPlay) {
        setGroupName("");
      }

      setAnswer("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [props.show, gameInfo?.isTurnPlay]);

  useEffect(() => {
    if (gameInfo?.isTurnPlay) {
      setGroupName(groupList[turn].name);
    }
  }, [gameInfo?.isTurnPlay, turn]);

  const quizInfo = useMemo(() => {
    return quizList[props.index];
  }, [props.index, quizList]);

  const bgUrl = useMemo(() => {
    if (gameInfo?.isTurnPlay) {
      return `${process.env.PUBLIC_URL}/img/popup/bg_popup_paper_${(turn + 1)
        .toString()
        .padStart(2, "0")}.png`;
    }

    return `${process.env.PUBLIC_URL}/img/popup/bg_popup_paper_00.png`;
  }, [gameInfo?.isTurnPlay, turn]);

  const handleClose = () => {
    props.onClose();
  };

  const onSubmit = () => {
    props.onSubmit(groupName, answer);
    handleClose();
  };

  const onLoadImage = () => {
    setImageWidth(imageRef.current?.width ?? 0);
    setImageNaturalWidth(imageRef.current?.naturalWidth ?? 0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter" && e.keyCode === 13) {
      if (answer && groupName) {
        onSubmit();
      }
    }
  };

  return (
    <Modal
      className="quiz-modal pb-3"
      size="xl"
      show={props.show}
      onHide={handleClose}
      centered
    >
      <Modal.Body>
        <SliceImage
          className="quiz-modal__bg"
          image={bgUrl}
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

        <CloseButton onClick={handleClose} />

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
          <div className="position-relative d-flex justify-content-center pt-4 pb-5">
            <div className="quiz-modal__image-wrapper">
              <img
                ref={imageRef}
                src={quizInfo.image as string}
                onLoad={onLoadImage}
              />
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
                  multiple={
                    imageNaturalWidth === 0
                      ? 1
                      : imageWidth / Math.min(748, imageNaturalWidth)
                  }
                  onEnter={() => {
                    if (answer) {
                      onSubmit();
                    } else {
                      handleClose();
                    }
                  }}
                />
              )}
            </div>
          </div>
        )}

        {quizInfo.type === "일반" && (
          <div className="position-relative uiz-modal__normal p-5 text-center">
            <div className="quiz-modal__normal-content mb-4">
              {quizInfo.content}
            </div>

            {quizInfo.image && (
              <img
                className="w-100 mb-4"
                src={quizInfo.image! as string}
                alt=""
              />
            )}

            {quizInfo.answerType === "단답형" && (
              <input
                ref={inputRef}
                type="text"
                className="text-center quiz-modal__normal-short-answer-input"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                onKeyDown={onKeyDown}
              />
            )}

            {quizInfo.answerType === "OX" && (
              <ButtonGroup>
                {["O", "X"].map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    size="lg"
                    variant="outline-success"
                    name="radio"
                    value={radio}
                    checked={answer === radio}
                    onChange={e => setAnswer(e.currentTarget.value)}
                  >
                    {radio}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            )}
          </div>
        )}

        {!gameInfo?.isTurnPlay && (
          <div className="quiz-modal__group-list">
            <ButtonGroup className="mb-5" size="lg">
              {groupList.map((group, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant="outline-secondary"
                  name="radio"
                  value={group.name}
                  checked={groupName === group.name}
                  onChange={e => setGroupName(e.currentTarget.value)}
                >
                  {group.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
        )}

        <div className="d-flex justify-content-end column-gap-3 mt-3">
          <ImageNormalButton
            className="me-2"
            label="닫기"
            onClick={handleClose}
          />
          <ImagePrimaryButton
            label="정답제출"
            onClick={onSubmit}
            disabled={!answer || !groupName}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

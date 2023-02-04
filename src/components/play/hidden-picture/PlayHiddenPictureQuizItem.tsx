import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import classNames from "classnames";
import { SliceImage } from "components/common/SliceImage";
import { QuizFailModal } from "components/modals/QuizFailModal";
import { QuizModal } from "components/modals/QuizModal";
import { QuizSuccessModal } from "components/modals/QuizSuceessModal";
import { CONST } from "const";
import { useEffect, useMemo, useState } from "react";
import { usePlay } from "store/usePlay";
import "./PlayHiddenPictureQuizItem.scss";

interface Props {
  index: number;
}

export const PlayHiddenPictureQuizItem = (props: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showFailModal, setShowFailModal] = useState<boolean>(false);
  const [groupName, setGroupName] = useState("");

  const {
    quizList,
    gameInfo,
    updateGroupListScore,
    updateGroupListKey,
    keyList,
    updateQuizListFinished,
    updateTurn
  } = usePlay();

  const quizInfo = useMemo(() => {
    return quizList[props.index];
  }, [props.index, quizList]);

  useEffect(() => {
    if (show) {
      setGroupName("");
    }
  }, [show]);

  const onClick = () => {
    if (!quizInfo.finished) {
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const onSubmit = (groupName_: string, answer: string) => {
    setGroupName(groupName_);
    handleClose();
    setTimeout(() => {
      if (quizInfo.answerType === "단답형") {
        if (quizInfo.shortAnswerQuestionInfo?.answer === answer) {
          setShowSuccessModal(true);
        } else {
          setShowFailModal(true);
        }
      }
    }, 200);
  };

  const handleCloseSuccessModal = () => {
    updateQuizListFinished(props.index);
    updateGroupListScore(groupName, quizInfo.score ?? CONST.DEFAULT_SCORE);

    if (keyList.includes(props.index)) {
      updateGroupListKey(groupName, 1);
    }

    if (gameInfo?.isTurnPlay) {
      updateTurn();
    }

    setShowSuccessModal(false);
  };

  const handleCloseFailModal = () => {
    if (gameInfo?.isTurnPlay) {
      updateTurn();
    }

    setShowFailModal(false);
  };

  return (
    <>
      <div
        className={classNames("play-hidden-picture-quiz-item", {
          finished: quizInfo.finished
        })}
        onClick={onClick}
      >
        <SliceImage
          className="play-hidden-picture-quiz-item__back"
          image={`${process.env.PUBLIC_URL}/img/quiz/bg_quizbox.png`}
          top={83}
          right={18}
          bottom={18}
          left={57}
        />
        <span className="play-hidden-picture-quiz-item__score">
          {(props.index + 1).toString().padStart(2, " ")}
        </span>
        <img
          className="play-hidden-picture-quiz-item__question_icon"
          src={`${process.env.PUBLIC_URL}/img/quiz/icon_question.png`}
        />

        <div className="play-hidden-picture-quiz-item__star-icon">
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
        <div className="play-hidden-picture-quiz-item__subject">
          {quizInfo.subject}
        </div>
        {quizInfo.keyword && (
          <div className="play-hidden-picture-quiz-item__subject">
            {quizInfo.keyword}
          </div>
        )}
      </div>

      <QuizModal
        show={show}
        index={props.index}
        onSubmit={onSubmit}
        onClose={() => setShow(false)}
      />

      <QuizSuccessModal
        show={showSuccessModal}
        onClose={handleCloseSuccessModal}
      />

      <QuizFailModal show={showFailModal} onClose={handleCloseFailModal} />
    </>
  );
};

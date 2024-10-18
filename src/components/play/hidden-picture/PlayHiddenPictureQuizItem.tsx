import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import classNames from "classnames";
import { SliceImage } from "components/common/SliceImage";
import { QuizFailModal } from "components/modals/QuizFailModal";
import { QuizModal } from "components/modals/QuizModal";
import {
  QuizSuccessModal,
  SuccessModalProps
} from "components/modals/QuizSuccessModal";
import { CONST } from "const";
import { ItemType } from "interfaces/Items";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePlay } from "store/usePlay";
import "./PlayHiddenPictureQuizItem.scss";

interface Props {
  index: number;
}

export const PlayHiddenPictureQuizItem = (props: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [successModalProps, setSuccessModalProps] = useState<SuccessModalProps>(
    { show: false }
  );
  const [showFailModal, setShowFailModal] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement>(null);

  const {
    quizList,
    gameInfo,
    finished,
    groupList,
    keyQuizIndexList,
    updateGroupListScore,
    updateGroupListItem,
    updateQuizListFinished,
    updateTurn,
    changeKeyItem
  } = usePlay();

  const quizInfo = useMemo(() => {
    return quizList[props.index];
  }, [props.index, quizList]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [successModalProps.show, showFailModal]);

  const onClick = () => {
    if (!quizInfo.finished) {
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const onSubmit = (groupName: string, answer: string | number) => {
    handleClose();
    setTimeout(() => {
      let isAnswer = false;
      if (quizInfo.answerType === "단답형") {
        if (quizInfo.shortAnswerQuestionInfo?.answer === answer) {
          isAnswer = true;
        }
      } else if (quizInfo.answerType === "OX") {
        if (quizInfo.oxAnswer === (answer === "O")) {
          isAnswer = true;
        }
      } else if (quizInfo.answerType === "객관식") {
        if (quizInfo.multipleChoiceInfo?.rightAnswer === answer) {
          isAnswer = true;
        }
      }

      if (isAnswer) {
        let reward: ItemType = "NONE";
        let rewardText = "";

        // 문제풀이권 획득
        if (
          (gameInfo?.keyAcquisitionType ??
            CONST.DEFAULT_KEY_ACQUISITION_TYPE) === "SCORE"
        ) {
          const group = groupList.find(group => group.name === groupName);
          const keyRange = gameInfo?.keyRange ?? CONST.DEFAULT_KEY_RANGE;
          if (group) {
            if (
              Math.floor(group.score! / keyRange) <
              Math.floor((group.score + quizInfo.score) / keyRange)
            ) {
              reward = "KEY";
              rewardText = "문제 풀이권을 획득했습니다.";
              updateGroupListItem(groupName, "KEY", 1);
            }
          }
        } else if (
          (gameInfo?.keyAcquisitionType ??
            CONST.DEFAULT_KEY_ACQUISITION_TYPE) === "RANDOM"
        ) {
          if (keyQuizIndexList.includes(props.index)) {
            reward = "KEY";
            rewardText = "문제 풀이권을 획득했습니다.";
            updateGroupListItem(groupName, "KEY", 1);
          }
        }

        // if (reward === "NONE") {
        //   let r = Math.random();
        //   // 아이템 획득 확률 20%
        //   if (r < CONST.GET_ITEM_RATE) {
        //     // 아이템 종류 랜덤
        //     r = Math.random();
        //     if (r < CONST.KEY_EXCHANGE_ITEM_RATE) {
        //       reward = "KEY_EXCHANGE";
        //       rewardText =
        //         "문제풀이권 교환 아이템을 획득 했습니다. 문제풀이권을 교환할 모둠이 없습니다.";

        //       const myKeyCount = group?.items["KEY"] ?? 0;

        //       // 내가 가진 개수를 제외한 가장 많은 문제풀이권 개수 구허가
        //       const keyCountList = groupList
        //         .filter(group => (group.items["KEY"] ?? 0) !== myKeyCount)
        //         .map(group => group.items["KEY"] ?? 0);

        //       if (!_.isEmpty(keyCountList)) {
        //         const maxKeyCount = Math.max(...keyCountList);
        //         const changeGroupName =
        //           _.sample(
        //             groupList
        //               .filter(group => group.items["KEY"] === maxKeyCount)
        //               .map(group => group.name)
        //           ) ?? "";

        //         if (changeGroupName) {
        //           rewardText = `문제풀이권 교환 아이템을 획득 했습니다. '${changeGroupName}'모둠과 교환합니다.`;
        //           changeKeyItem(groupName, changeGroupName);
        //         }
        //       }
        //     } else if (
        //       r <
        //       CONST.KEY_EXCHANGE_ITEM_RATE + CONST.MINE_DEFENSE_ITEM_RATE
        //     ) {
        //       // 지뢰방어
        //     } else {
        //       // 지뢰
        //     }
        //   }
        // }

        updateGroupListScore(groupName, quizInfo.score ?? CONST.DEFAULT_SCORE);

        setSuccessModalProps({
          show: true,
          reward,
          rewardText
        });
      } else {
        setShowFailModal(true);
      }
    }, 200);
  };

  const handleCloseSuccessModal = () => {
    updateQuizListFinished(props.index);

    if (gameInfo?.isTurnPlay) {
      updateTurn();
    }

    setSuccessModalProps({
      show: false
    });
  };

  const handleCloseFailModal = () => {
    if (gameInfo?.isTurnPlay) {
      updateTurn();
    }

    setShowFailModal(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      if (successModalProps.show) {
        handleCloseSuccessModal();
      }

      if (showFailModal) {
        handleCloseFailModal();
      }
    }
  };

  return (
    <>
      <div
        className={classNames("play-hidden-picture-quiz-item", {
          finished: quizInfo.finished || finished,
          "game-finished": finished
        })}
        onClick={onClick}
        ref={divRef}
      >
        <SliceImage
          className="play-hidden-picture-quiz-item__back"
          image={`${process.env.PUBLIC_URL}/img/quiz/bg_quizbox.png`}
          top={83}
          right={18}
          bottom={18}
          left={57}
          topWidth={60}
          leftWidth={43}
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
          {quizInfo.keyword ? ` / ${quizInfo.keyword}` : ""}
        </div>
      </div>

      <QuizModal
        show={show}
        index={props.index}
        onSubmit={onSubmit}
        onClose={() => setShow(false)}
      />

      <QuizSuccessModal
        {...successModalProps}
        onClose={handleCloseSuccessModal}
      />

      <QuizFailModal show={showFailModal} onClose={handleCloseFailModal} />
    </>
  );
};

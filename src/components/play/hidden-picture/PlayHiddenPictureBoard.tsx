import { usePlay } from "store/usePlay";
import "./PlayHiddenPictureBoard.scss";
import { PlayHiddenPictureQuizItem } from "./PlayHiddenPictureQuizItem";

export const PlayHiddenPictureBoard = () => {
  const { gameInfo, quizList } = usePlay();

  return (
    <div className="play-hidden-picture-board">
      <div className="play-hidden-picture-board__box">
        <div className="play-hidden-picture-board__tree">
          <img
            src={`${process.env.PUBLIC_URL}/img/quiz/bg_quiz_tree_left_bg.png`}
          />
          <img
            src={`${process.env.PUBLIC_URL}/img/quiz/bg_quiz_tree_center_bg.png`}
          />
          <img
            src={`${process.env.PUBLIC_URL}/img/quiz/bg_quiz_tree_right_bg.png`}
          />
        </div>

        <img
          className="play-hidden-picture-board__answer-picture"
          src={gameInfo?.image as string}
        />

        <div
          className="play-hidden-picture-board__quiz-list"
          style={{ gridTemplateColumns: `repeat(${gameInfo?.sizeX}, 1fr)` }}
        >
          {quizList.map((item, i) => (
            <PlayHiddenPictureQuizItem key={`${item.id}-${i}`} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

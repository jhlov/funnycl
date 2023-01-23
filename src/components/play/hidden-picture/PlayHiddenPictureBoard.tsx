import { usePlay } from "store/usePlay";
import "./PlayHiddenPictureBoard.scss";
import { PlayHiddenPictureQuizItem } from "./PlayHiddenPictureQuizItem";

export const PlayHiddenPictureBoard = () => {
  const { gameInfo, quizList } = usePlay();

  return (
    <div className="play-hidden-picture-board">
      <div className="play-hidden-picture-board__box">
        <img className="" src={gameInfo?.image as string} />

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

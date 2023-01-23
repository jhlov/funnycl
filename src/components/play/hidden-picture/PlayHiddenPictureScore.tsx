import FlipMove from "react-flip-move";
import { usePlay } from "store/usePlay";
import "./PlayHiddenPictureScore.scss";
import { PlayHiddenPictureScoreItem } from "./PlayHiddenPictureScoreItem";

export const PlayHiddenPictureScore = () => {
  const { groupList } = usePlay();

  return (
    <div className="play-hidden-picture-score">
      <div className="title mb-5">SCORE</div>
      <div>
        <FlipMove>
          {groupList
            .sort((a, b) => b?.score - a?.score)
            .map(group => (
              <div key={group.name}>
                <PlayHiddenPictureScoreItem group={group} />
              </div>
            ))}
        </FlipMove>
      </div>
    </div>
  );
};

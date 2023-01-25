import { useMemo } from "react";
import FlipMove from "react-flip-move";
import { usePlay } from "store/usePlay";
import "./PlayHiddenPictureScore.scss";
import { PlayHiddenPictureScoreItem } from "./PlayHiddenPictureScoreItem";

export const PlayHiddenPictureScore = () => {
  const { groupList } = usePlay();

  // groupList의 순서가 변경되지 않게 하기 위해서 copyList 사용
  const copyList = useMemo(() => {
    return [...groupList];
  }, [groupList]);

  return (
    <div className="play-hidden-picture-score">
      <div className="title mb-4">SCORE</div>
      <div>
        <FlipMove>
          {copyList
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

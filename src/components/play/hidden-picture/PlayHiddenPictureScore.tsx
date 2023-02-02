import { SliceImage } from "components/common/SliceImage";
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
      <img
        className="play-hidden-picture-score__title"
        src={`${process.env.PUBLIC_URL}/img/score/img_score_title_text.png`}
      />
      <SliceImage
        className="play-hidden-picture-score__bg"
        image={`${process.env.PUBLIC_URL}/img/score/img_score_title_bg.png`}
        top={30}
        right={10}
        bottom={16}
        left={10}
      />
      <div className="play-hidden-picture-score__item-list">
        <FlipMove>
          {copyList
            .sort((a, b) => b?.score - a?.score)
            .map(group => (
              <div key={group.name}>
                <PlayHiddenPictureScoreItem
                  group={group}
                  groupIndex={groupList.indexOf(group)}
                />
              </div>
            ))}
        </FlipMove>
      </div>
    </div>
  );
};

import { Group } from "interfaces/Group";
import "./PlayHiddenPictureScoreItem.scss";

interface Props {
  group: Group;
}

export const PlayHiddenPictureScoreItem = (props: Props) => {
  return (
    <div className={`play-hidden-picture-score-item mb-2 ${props.group.color}`}>
      <span>{props.group.name}</span>
      <span className="play-hidden-picture-score-item__score">
        {props.group.score}
      </span>
    </div>
  );
};

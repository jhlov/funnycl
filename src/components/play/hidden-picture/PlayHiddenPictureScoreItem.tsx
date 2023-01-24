import KeyIcon from "@mui/icons-material/Key";
import { Group } from "interfaces/Group";
import "./PlayHiddenPictureScoreItem.scss";

interface Props {
  group: Group;
}

export const PlayHiddenPictureScoreItem = (props: Props) => {
  const onClickKey = () => {};

  return (
    <div className={`play-hidden-picture-score-item mb-2 ${props.group.color}`}>
      <div>
        <span>
          {props.group.name}

          {0 < (props.group.key ?? 0) && (
            <span className="ms-2">
              <small>
                <KeyIcon
                  className="play-hidden-picture-score-item__key"
                  onClick={onClickKey}
                />
                {`x${props.group.key}`}
              </small>
            </span>
          )}
        </span>
      </div>

      <span className="play-hidden-picture-score-item__score">
        {props.group.score}
      </span>
    </div>
  );
};

import { PlayHiddenPictureBoard } from "components/play/hidden-picture/PlayHiddenPictureBoard";
import { PlayHiddenPictureScore } from "components/play/hidden-picture/PlayHiddenPictureScore";
import "./PlayHiddenPicture.scss";

export const PlayHiddenPicture = () => {
  return (
    <div className="play-hidden-picture">
      <PlayHiddenPictureBoard />
      <PlayHiddenPictureScore />
    </div>
  );
};

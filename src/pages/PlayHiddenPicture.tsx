import { PlayHiddenPictureBoard } from "components/play/hidden-picture/PlayHiddenPictureBoard";
import { PlayHiddenPictureScore } from "components/play/hidden-picture/PlayHiddenPictureScore";
import { useMemo } from "react";
import "./PlayHiddenPicture.scss";

export const PlayHiddenPicture = () => {
  const bgName = useMemo(() => {
    return `${process.env.PUBLIC_URL}/img/bg/background_0${Math.ceil(
      Math.random() * 4
    )}.png`;
  }, []);

  return (
    <div className="play-hidden-picture">
      <img className="play-hidden-picture__bg" src={bgName} />
      <PlayHiddenPictureBoard />
      <PlayHiddenPictureScore />
    </div>
  );
};

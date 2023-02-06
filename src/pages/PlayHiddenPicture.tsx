import { GameWinModal } from "components/modals/GameWinModal";
import { PlayHiddenPictureBoard } from "components/play/hidden-picture/PlayHiddenPictureBoard";
import { PlayHiddenPictureScore } from "components/play/hidden-picture/PlayHiddenPictureScore";
import { useMemo } from "react";
import { usePlay } from "store/usePlay";
import "./PlayHiddenPicture.scss";

export const PlayHiddenPicture = () => {
  const { gameWinModalProps, setFinished, setGameWinModalProps } = usePlay();

  const bgName = useMemo(() => {
    return `${process.env.PUBLIC_URL}/img/bg/background_0${Math.ceil(
      Math.random() * 4
    )}.png`;
  }, []);

  const handleCloseSuccessModal = () => {
    setGameWinModalProps({
      show: false
    });
    setFinished();
  };

  return (
    <>
      <div className="play-hidden-picture">
        <img className="play-hidden-picture__bg" src={bgName} />
        <PlayHiddenPictureBoard />
        <PlayHiddenPictureScore />
      </div>

      <GameWinModal {...gameWinModalProps} onClose={handleCloseSuccessModal} />
    </>
  );
};

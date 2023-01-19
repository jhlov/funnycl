import { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";
import { usePlay } from "store/usePlay";

interface Params {
  id: string;
}

export const Play = (props: any) => {
  const match = useRouteMatch();
  const { gameInfo, getGameInfo } = usePlay();
  const [checkSetting, setCheckSetting] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);

  const id = useMemo(() => {
    return (match.params as Params).id;
  }, [match]);

  useEffect(() => {
    if (id) {
      getGameInfo(id);
    }
  }, [id]);

  useEffect(() => {
    if (!checkSetting && gameInfo) {
      setCheckSetting(true);
      if (gameInfo.isPlaySetting) {
        setShowSettingModal(true);
      }
    }
  }, [gameInfo, checkSetting]);

  const startGame = () => {
    setShowSettingModal(false);
  };

  return (
    <>
      <div>play</div>

      <Modal
        size="lg"
        show={showSettingModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>문제 세팅</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>설정</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={startGame}>
            시작
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

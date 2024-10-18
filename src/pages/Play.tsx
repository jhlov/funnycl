import { yearList } from "components/admin/quiz/NewQuizInfo";
import { CONST } from "const";
import { quizSubjectList } from "interfaces/Quiz";
import { useEffect, useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";
import { usePlay } from "store/usePlay";
import { PlayHiddenPicture } from "./PlayHiddenPicture";

interface Params {
  id: string;
}

export const Play = (props: any) => {
  const match = useRouteMatch();
  const {
    startGame,
    gameInfo,
    getGameInfo,
    setGameInfo,
    initGame,
    getUserInfo
  } = usePlay();
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
    if (gameInfo?.userId) {
      getUserInfo();
    }
  }, [gameInfo?.userId]);

  useEffect(() => {
    if (!checkSetting && gameInfo) {
      setCheckSetting(true);
      setShowSettingModal(true);
    }
  }, [gameInfo, checkSetting]);

  const onClickStartGame = () => {
    setShowSettingModal(false);

    // 문제 불러오기
    initGame();
  };

  return (
    <>
      {startGame && gameInfo?.type === "숨겨진그림" && <PlayHiddenPicture />}

      <Modal
        className="pb-3"
        show={showSettingModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>
            {gameInfo?.title} <small>({gameInfo?.type})</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {gameInfo && (
            <Form className="text-start">
              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  label="턴제 게임 진행"
                  checked={gameInfo.isTurnPlay ?? true}
                  onChange={e => setGameInfo("isTurnPlay", e.target.checked)}
                />
              </Form.Group>
              <Form.Group className="new-game__size mb-4">
                <Form.Label>크기 (가로 x 세로) </Form.Label>
                <div className="d-flex">
                  <Form.Select
                    value={gameInfo.sizeX}
                    onChange={e => setGameInfo("sizeX", Number(e.target.value))}
                  >
                    {Array(CONST.MAX_BOARD_SIZE_X)
                      .fill(0)
                      .map((_, i) => (
                        <option key={`sizeX_${i}`} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </Form.Select>
                  <span> ~ </span>
                  <Form.Select
                    value={gameInfo.sizeY}
                    onChange={e => setGameInfo("sizeY", Number(e.target.value))}
                  >
                    {Array(CONST.MAX_BOARD_SIZE_Y)
                      .fill(0)
                      .map((_, i) => (
                        <option key={`sizeY${i}`} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>문제풀이권 획득 방법</Form.Label>
                <Form.Select
                  value={gameInfo.keyAcquisitionType}
                  onChange={e =>
                    setGameInfo("keyAcquisitionType", e.target.value)
                  }
                >
                  <option value="SCORE">점수 획득</option>
                  <option value="RANDOM">랜덤</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>
                  {(gameInfo.keyAcquisitionType ??
                    CONST.DEFAULT_KEY_ACQUISITION_TYPE) === "SCORE"
                    ? "문제풀이권 획득 점수 간격"
                    : "문제풀이권 획득 랜덤 %"}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={gameInfo.keyRange ?? CONST.DEFAULT_KEY_RANGE}
                  onChange={e =>
                    setGameInfo("keyRange", Number(e.target.value))
                  }
                />
              </Form.Group>

              <Form.Group className="new-game__group mb-4">
                <Form.Label>모둠수</Form.Label>
                <Form.Select
                  value={gameInfo.groupCount}
                  onChange={e =>
                    setGameInfo("groupCount", Number(e.target.value))
                  }
                >
                  {Array(CONST.MAX_GROUP_COUNT)
                    .fill(0)
                    .map((_, i) => (
                      <option key={`groupCount_${i}`} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                </Form.Select>
                {Array(gameInfo.groupCount)
                  .fill(0)
                  .map((_, i) => (
                    <Form.Group key={`groupName${i}`}>
                      <Form.Control
                        type="text"
                        value={
                          (gameInfo.groupNameList
                            ? gameInfo.groupNameList
                            : CONST.DEFAULT_GROUP_NAME_LIST)[i]
                        }
                        onChange={e =>
                          setGameInfo(
                            "groupNameList",
                            (gameInfo.groupNameList
                              ? gameInfo.groupNameList
                              : CONST.DEFAULT_GROUP_NAME_LIST
                            ).map((item, j) =>
                              i === j ? e.target.value : item
                            )
                          )
                        }
                      />
                    </Form.Group>
                  ))}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>과목</Form.Label>
                <Form.Select
                  value={gameInfo.subject}
                  onChange={e => setGameInfo("subject", e.target.value)}
                >
                  {["랜덤", ...quizSubjectList].map(item => (
                    <option key={`subject${item}`} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="new-game__year mb-4">
                <Form.Label>과정</Form.Label>
                <div className="d-flex">
                  <Form.Select
                    value={gameInfo.yearStart}
                    onChange={e =>
                      setGameInfo("yearStart", Number(e.target.value))
                    }
                  >
                    {yearList.map(item => (
                      <option key={`yearStart_${item[0]}`} value={item[0]}>
                        {item[1]}
                      </option>
                    ))}
                  </Form.Select>
                  <span> ~ </span>
                  <Form.Select
                    value={gameInfo.yearEnd}
                    onChange={e =>
                      setGameInfo("yearEnd", Number(e.target.value))
                    }
                  >
                    {yearList.map(item => (
                      <option key={`yearEnd_${item[0]}`} value={item[0]}>
                        {item[1]}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group className="new-game__size mb-4">
                <Form.Label>난이도</Form.Label>
                <div className="d-flex">
                  <Form.Select
                    value={gameInfo.difficultyStart}
                    onChange={e =>
                      setGameInfo("difficultyStart", Number(e.target.value))
                    }
                  >
                    {Array(CONST.DIFFICULTY_END)
                      .fill(0)
                      .map((_, i) => (
                        <option key={`difficultyStart_${i}`} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </Form.Select>
                  <span> ~ </span>
                  <Form.Select
                    value={gameInfo.difficultyEnd}
                    onChange={e =>
                      setGameInfo("difficultyEnd", Number(e.target.value))
                    }
                  >
                    {Array(CONST.DIFFICULTY_END)
                      .fill(0)
                      .map((_, i) => (
                        <option key={`difficultyEnd_${i}`} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onClickStartGame}>
            시작
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

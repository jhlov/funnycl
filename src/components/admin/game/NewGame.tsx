import classNames from "classnames";
import { ImageInput } from "components/common/ImageInput";
import { CONST } from "const";
import { quizSubjectList } from "interfaces/Quiz";
import { useEffect, useMemo } from "react";
import { Form } from "react-bootstrap";
import { useGame } from "store/useGame";
import { yearList } from "../quiz/NewQuizInfo";
import "./NewGame.scss";

export const NewGame = () => {
  const { newGame, gameList, getGameList, setNewGame, modifyGameId } =
    useGame();

  useEffect(() => {
    getGameList();
  }, []);

  const gameTitleError = useMemo(() => {
    if (
      newGame.title &&
      0 <
        gameList.filter(
          item => item.id !== modifyGameId && item.title === newGame.title
        ).length
    ) {
      return "동일한 이름의 게임이 존재합니다.";
    }
  }, [gameList, newGame.title]);

  return (
    <div className="new-game p-5 w-100">
      <div className="d-flex">
        <div>
          <Form className="text-start">
            <Form.Group className="mb-4">
              <Form.Label>게임 종류</Form.Label>
              <Form.Control type="text" value={newGame.type} readOnly />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>게임 이름</Form.Label>
              <Form.Control
                type="text"
                value={newGame.title}
                onChange={e => setNewGame("title", e.target.value)}
              />
              <Form.Text
                className={classNames({ "text-danger": gameTitleError })}
              >
                {gameTitleError}
              </Form.Text>
            </Form.Group>

            {newGame.type === "숨겨진그림" && (
              <Form.Group className="mb-4">
                <Form.Label>그림 정답</Form.Label>
                <Form.Control
                  type="text"
                  value={newGame.hiddenPictureAnswer ?? ""}
                  onChange={e =>
                    setNewGame("hiddenPictureAnswer", e.target.value)
                  }
                />
              </Form.Group>
            )}

            <ImageInput
              image={newGame.image}
              onChangeImage={v => setNewGame("image", v)}
              onChangeImageUrl={v => setNewGame("imageUrl", v)}
            />

            {newGame.image && (
              <img
                className="w-100"
                src={
                  typeof newGame.image === "string"
                    ? newGame.image
                    : newGame.imageUrl
                }
              />
            )}
          </Form>
        </div>
        <div>
          <Form className="text-start">
            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                label="턴제 게임 진행"
                checked={newGame.isTurnPlay ?? true}
                onChange={e => setNewGame("isTurnPlay", e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="new-game__size mb-4">
              <Form.Label>크기 (가로 x 세로) </Form.Label>
              <div className="d-flex">
                <Form.Select
                  value={newGame.sizeX}
                  onChange={e => setNewGame("sizeX", Number(e.target.value))}
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
                  value={newGame.sizeY}
                  onChange={e => setNewGame("sizeY", Number(e.target.value))}
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
              <Form.Label>문제풀이권 개수</Form.Label>
              <Form.Control
                type="text"
                value={newGame.keyCount ?? CONST.DEFAULT_KEY_COUNT}
                onChange={e => setNewGame("keyCount", Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="new-game__group mb-4">
              <Form.Label>모둠수</Form.Label>
              <Form.Select
                value={newGame.groupCount}
                onChange={e => setNewGame("groupCount", Number(e.target.value))}
              >
                {Array(CONST.MAX_GROUP_COUNT)
                  .fill(0)
                  .map((_, i) => (
                    <option key={`groupCount_${i}`} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
              </Form.Select>
              {Array(newGame.groupCount)
                .fill(0)
                .map((_, i) => (
                  <Form.Group>
                    <Form.Control
                      type="text"
                      value={
                        (newGame.groupNameList
                          ? newGame.groupNameList
                          : CONST.DEFAULT_GROUP_NAME_LIST)[i]
                      }
                      onChange={e =>
                        setNewGame(
                          "groupNameList",
                          (newGame.groupNameList
                            ? newGame.groupNameList
                            : CONST.DEFAULT_GROUP_NAME_LIST
                          ).map((item, j) => (i === j ? e.target.value : item))
                        )
                      }
                    />
                  </Form.Group>
                ))}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>과목</Form.Label>
              <Form.Select
                value={newGame.subject}
                onChange={e => setNewGame("subject", e.target.value)}
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
                  value={newGame.yearStart}
                  onChange={e =>
                    setNewGame("yearStart", Number(e.target.value))
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
                  value={newGame.yearEnd}
                  onChange={e => setNewGame("yearEnd", Number(e.target.value))}
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
                  value={newGame.difficultyStart}
                  onChange={e =>
                    setNewGame("difficultyStart", Number(e.target.value))
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
                  value={newGame.difficultyEnd}
                  onChange={e =>
                    setNewGame("difficultyEnd", Number(e.target.value))
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
        </div>
      </div>
    </div>
  );
};

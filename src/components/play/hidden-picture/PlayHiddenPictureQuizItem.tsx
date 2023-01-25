import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import classNames from "classnames";
import { ShortAnswerQuestion } from "components/ShortAnswerQuestion";
import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";
import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Modal,
  ToggleButton
} from "react-bootstrap";
import { usePlay } from "store/usePlay";
import "./PlayHiddenPictureQuizItem.scss";

interface Props {
  index: number;
}

export const PlayHiddenPictureQuizItem = (props: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [groupName, setGroupName] = useState("");

  const {
    quizList,
    groupList,
    updateGroupListScore,
    updateGroupListKey,
    keyList,
    updateQuizListFinished
  } = usePlay();

  const quizInfo = useMemo(() => {
    return quizList[props.index];
  }, [props.index, quizList]);

  useEffect(() => {
    if (show) {
      setAnswer("");
      setResult("");
      setGroupName("");
    }
  }, [show]);

  const onClick = () => {
    if (!quizInfo.finished) {
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const onSubmit = () => {
    handleClose();
    setTimeout(() => {
      if (quizInfo.answerType === "단답형") {
        if (quizInfo.shortAnswerQuestionInfo?.answer === answer) {
          setResult("정답입니다!!!");
        } else {
          setResult("오답입니다");
        }
      }
    }, 200);
  };

  const handleCloseResult = () => {
    if (quizInfo.answerType === "단답형") {
      if (quizInfo.shortAnswerQuestionInfo?.answer === answer) {
        updateQuizListFinished(props.index);
        updateGroupListScore(groupName, quizInfo.score ?? 10);

        if (keyList.includes(props.index)) {
          updateGroupListKey(groupName, 1);
        }
      }
    }

    setResult("");
  };

  return (
    <>
      <div
        className={classNames("play-hidden-picture-quiz-item", {
          finished: quizInfo.finished
        })}
        onClick={onClick}
      >
        <div className="play-hidden-picture-quiz-item__badge-list">
          <Badge bg="primary">{quizInfo.subject}</Badge>
          {quizInfo.keyword && <Badge bg="info">{quizInfo.keyword}</Badge>}
          <Badge className="star-icon" bg="warning" text="dark">
            {Array(Math.floor(Number(quizInfo.difficulty) / 2))
              .fill(0)
              .map((_, i) => (
                <StarIcon key={`star-${i}`} fontSize="small" />
              ))}
            {Array(quizInfo.difficulty % 2)
              .fill(0)
              .map((_, i) => (
                <StarHalfIcon key={`star-half-${i}`} fontSize="small" />
              ))}
          </Badge>
          <Badge bg="danger">{quizInfo.score ?? 10}</Badge>
        </div>
        <div className="play-hidden-picture-quiz-item__index">
          {props.index + 1}
        </div>
      </div>

      <Modal
        className="play-hidden-picture-quiz-item__quiz-modal pb-3"
        size="lg"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {`${props.index + 1}번 문제`}{" "}
            <small className="ms-1">
              ({`${quizInfo.subject} / ${quizInfo.score ?? 10}점`})
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {quizInfo.type === "워크시트" && (
            <div className="text-center mb-3">
              <div className="play-hidden-picture-quiz-item__image-wrapper">
                <img src={quizInfo.image as string} />
                {quizInfo.answerType === "단답형" && (
                  <ShortAnswerQuestion
                    index={0}
                    info={quizInfo.shortAnswerQuestionInfo!}
                    answer={answer}
                    onChange={(info: ShortAnswerQuestionInfo) =>
                      setAnswer(info.answer)
                    }
                    onRemove={() => {}}
                    isEditable={false}
                  />
                )}
              </div>
            </div>
          )}

          <div className="group-list">
            <ButtonGroup className="mb-2" size="lg">
              {groupList.map((group, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant="outline-secondary"
                  name="radio"
                  value={group.name}
                  checked={groupName === group.name}
                  onChange={e => setGroupName(e.currentTarget.value)}
                >
                  {group.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button
            variant="primary"
            onClick={onSubmit}
            disabled={!answer || !groupName}
          >
            정답 제출
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="quiz-result-modal pb-3"
        size="lg"
        show={!!result}
        onHide={handleCloseResult}
        centered
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <div>{result}</div>
          {keyList.includes(props.index) &&
            quizInfo.shortAnswerQuestionInfo?.answer === answer && (
              <div className="mt-3">
                <small>문제 풀이권을 획득 했습니다!!</small>
              </div>
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseResult}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

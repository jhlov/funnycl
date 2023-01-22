import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { useMemo } from "react";
import { Badge } from "react-bootstrap";
import { usePlay } from "store/usePlay";
import "./PlayHiddenPictureQuizItem.scss";

interface Props {
  index: number;
}

export const PlayHiddenPictureQuizItem = (props: Props) => {
  const { quizList } = usePlay();

  const quizInfo = useMemo(() => {
    return quizList[props.index];
  }, [props.index, quizList]);

  return (
    <div className="play-hidden-picture-quiz-item">
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
  );
};

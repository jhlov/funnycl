import OpenWithIcon from "@mui/icons-material/OpenWith";
import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";
import "./ShortAnswerQuestion.scss";

interface Props {
  shortAnswerQuestionInfo: ShortAnswerQuestionInfo;
  onChangeShortAnswerQuestionInfo: (info: ShortAnswerQuestionInfo) => void;
}

const ShortAnswerQuestion = ({
  shortAnswerQuestionInfo,
  onChangeShortAnswerQuestionInfo
}: Props) => {
  const onChangeshortAnswerQuestionAnswer = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangeShortAnswerQuestionInfo({
      ...shortAnswerQuestionInfo!,
      answer: e.target.value
    });
  };

  const onDragStartShortAnswerQuestionAnswer = (e: React.DragEvent) => {
    const img = new Image(0, 0);
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const onDragShortAnswerQuestionAnswer = (e: React.DragEvent) => {
    console.log((e.target as HTMLElement).offsetLeft);
    if (e.clientX && e.clientY) {
      onChangeShortAnswerQuestionInfo({
        ...shortAnswerQuestionInfo!,
        x: e.clientX - shortAnswerQuestionInfo!.offsetLeft + 4,
        y: e.clientY - shortAnswerQuestionInfo!.offsetTop + 4
      });
    }
  };

  return (
    <div
      className="short-answer-question"
      style={{
        left: shortAnswerQuestionInfo?.x,
        top: shortAnswerQuestionInfo?.y
      }}
    >
      <div
        draggable
        className="short-answer-question-move"
        onDragStart={onDragStartShortAnswerQuestionAnswer}
        onDrag={onDragShortAnswerQuestionAnswer}
        // onDragEnter={e => console.log(e)}
        onDragOver={e => e.preventDefault()}
        // onDragEnd={e => console.log(e)}
      >
        <OpenWithIcon fontSize="small" />
      </div>
      <input
        type="text"
        style={{
          width: shortAnswerQuestionInfo?.width,
          height: shortAnswerQuestionInfo?.height
        }}
        value={shortAnswerQuestionInfo?.answer}
        onChange={onChangeshortAnswerQuestionAnswer}
      />
    </div>
  );
};

export { ShortAnswerQuestion };

import CloseIcon from "@mui/icons-material/Close";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";
import "./ShortAnswerQuestion.scss";

interface Props {
  index: number;
  info: ShortAnswerQuestionInfo;
  onChange: (info: ShortAnswerQuestionInfo) => void;
  onRemove: (index: number) => void;
}

const ShortAnswerQuestion = (props: Props) => {
  const onChangeshortAnswerQuestionAnswer = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.onChange({
      ...props.info!,
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
      props.onChange({
        ...props.info!,
        x: e.clientX - props.info!.offsetLeft + 4,
        y: e.clientY - props.info!.offsetTop + 4
      });
    }
  };

  return (
    <div
      className="short-answer-question"
      style={{
        left: props.info?.x,
        top: props.info?.y
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
      <div
        className="short-answer-question-delete"
        onClick={() => props.onRemove(props.index)}
      >
        <CloseIcon fontSize="small" />
      </div>
      <input
        type="text"
        style={{
          width: props.info?.width,
          height: props.info?.height
        }}
        value={props.info?.answer}
        onChange={onChangeshortAnswerQuestionAnswer}
      />
    </div>
  );
};

export { ShortAnswerQuestion };

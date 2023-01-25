import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import SignalCellular4BarIcon from "@mui/icons-material/SignalCellular4Bar";
import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";
import { useState } from "react";
import "./ShortAnswerQuestion.scss";

interface Props {
  index: number;
  info: ShortAnswerQuestionInfo;
  answer: string;
  onChange: (info: ShortAnswerQuestionInfo) => void;
  onRemove: (index: number) => void;
  isEditable: boolean;
}

const ShortAnswerQuestion = (props: Props) => {
  const [prevClientX, setPrevClientX] = useState(0);
  const [prevClientY, setPrevClicntY] = useState(0);

  const onChangeshortAnswerQuestionAnswer = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.onChange({
      ...props.info!,
      answer: e.target.value
    });
  };

  const onDragStart = (e: React.DragEvent) => {
    const img = new Image(0, 0);
    e.dataTransfer.setDragImage(img, 0, 0);

    setPrevClientX(e.clientX);
    setPrevClicntY(e.clientY);
  };

  const onDragMove = (e: React.DragEvent) => {
    if (e.clientX && e.clientY) {
      props.onChange({
        ...props.info!,
        x: props.info.x + (e.clientX - prevClientX),
        y: props.info.y + (e.clientY - prevClientY)
      });

      setPrevClientX(e.clientX);
      setPrevClicntY(e.clientY);
    }
  };

  const onDragResize = (e: React.DragEvent) => {
    if (e.clientX && e.clientY) {
      props.onChange({
        ...props.info!,
        width: props.info.width + (e.clientX - prevClientX),
        height: props.info.height + (e.clientY - prevClientY)
      });

      setPrevClientX(e.clientX);
      setPrevClicntY(e.clientY);
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
      {props.isEditable && (
        <>
          <div
            draggable
            className="short-answer-question-move"
            onDragStart={onDragStart}
            onDrag={onDragMove}
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
            <DisabledByDefaultIcon fontSize="small" />
          </div>
          <div
            draggable
            className="short-answer-question-resize"
            onDragStart={onDragStart}
            onDrag={onDragResize}
            // onDragEnter={e => console.log(e)}
            onDragOver={e => e.preventDefault()}
            // onDragEnd={e => console.log(e)}
          >
            <SignalCellular4BarIcon fontSize="small" />
          </div>
        </>
      )}

      <input
        type="text"
        style={{
          width: props.info?.width,
          height: props.info?.height
        }}
        value={props.answer}
        onChange={onChangeshortAnswerQuestionAnswer}
      />
    </div>
  );
};

export { ShortAnswerQuestion };
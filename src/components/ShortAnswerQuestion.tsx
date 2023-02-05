import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import SignalCellular4BarIcon from "@mui/icons-material/SignalCellular4Bar";
import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";
import { useEffect, useRef, useState } from "react";
import "./ShortAnswerQuestion.scss";

interface Props {
  index: number;
  info: ShortAnswerQuestionInfo;
  answer: string;
  onChange: (info: ShortAnswerQuestionInfo) => void;
  onRemove: (index: number) => void;
  isEditable: boolean;
  multiple?: number;
  onEnter?: () => void;
}

const ShortAnswerQuestion = (props: Props) => {
  const [prevClientX, setPrevClientX] = useState(0);
  const [prevClientY, setPrevClicntY] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      if (props.onEnter) {
        props.onEnter();
      }
    }
  };

  return (
    <div
      className="short-answer-question"
      style={{
        left: (props.multiple ?? 1) * props.info?.x,
        top: (props.multiple ?? 1) * props.info?.y
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
        ref={inputRef}
        type="text"
        className="text-center"
        style={{
          width: (props.multiple ?? 1) * props.info?.width,
          height: (props.multiple ?? 1) * props.info?.height,
          fontSize: `${Math.round(
            (props.multiple ?? 1) * props.info?.height * 0.7
          )}px`,
          fontWeight: "bold"
        }}
        value={props.answer}
        onChange={onChangeshortAnswerQuestionAnswer}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export { ShortAnswerQuestion };

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useState } from "react";
import "./MultipleChoiceCircle.scss";

interface Props {
  isEditable: boolean;
  multiple?: number;
  x: number;
  y: number;
  checked: boolean;
  onChangePosition: (x: number, y: number) => void;
  onClickCircle: () => void;
}

export const MultipleChoiceCircle = (props: Props) => {
  const [prevClientX, setPrevClientX] = useState(0);
  const [prevClientY, setPrevClicntY] = useState(0);

  const onDragStart = (e: React.DragEvent) => {
    if (!props.isEditable) {
      return;
    }

    const img = new Image(0, 0);
    e.dataTransfer.setDragImage(img, 0, 0);

    setPrevClientX(e.clientX);
    setPrevClicntY(e.clientY);
  };

  const onDragMove = (e: React.DragEvent) => {
    if (!props.isEditable) {
      return;
    }

    if (e.clientX && e.clientY) {
      props.onChangePosition(
        props.x + (e.clientX - prevClientX),
        props.y + (e.clientY - prevClientY)
      );

      setPrevClientX(e.clientX);
      setPrevClicntY(e.clientY);
    }
  };

  return (
    <div
      draggable={props.isEditable}
      className="multiple-choice-circle position-absolute"
      style={{
        left:
          (props.multiple ?? 1) * props.x +
          (18 * ((props.multiple ?? 1) - 1)) / 2,
        top:
          (props.multiple ?? 1) * props.y +
          (24 * ((props.multiple ?? 1) - 1)) / 2,
        transform: `scale(${props.multiple ?? 1})`
      }}
      onClick={props.onClickCircle}
      onDragStart={onDragStart}
      onDrag={onDragMove}
      onDragOver={e => e.preventDefault()}
    >
      {props.checked ? (
        <RadioButtonCheckedIcon />
      ) : (
        <RadioButtonUncheckedIcon />
      )}
    </div>
  );
};

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import "./MultipleChoiceCircle.scss";

interface Props {
  multiple?: number;
  x: number;
  y: number;
  checked: boolean;
}

export const MultipleChoiceCircle = (props: Props) => {
  return (
    <div
      className="multiple-choice-circle position-absolute"
      style={{
        left: (props.multiple ?? 1) * props.x,
        top: (props.multiple ?? 1) * props.y
      }}
    >
      {props.checked ? (
        <RadioButtonCheckedIcon />
      ) : (
        <RadioButtonUncheckedIcon />
      )}
    </div>
  );
};

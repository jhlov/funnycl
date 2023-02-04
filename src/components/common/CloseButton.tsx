import CloseIcon from "@mui/icons-material/Close";
import "./CloseButton.scss";

interface Props {
  onClick: () => void;
}

export const CloseButton = (props: Props) => {
  return (
    <button className="close-button btn" onClick={props.onClick}>
      <CloseIcon />
    </button>
  );
};

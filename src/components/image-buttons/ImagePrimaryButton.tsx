import classNames from "classnames";
import { SliceImage } from "components/common/SliceImage";
import "./ImageNormalButton.scss";

interface Props {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

export const ImagePrimaryButton = (props: Props) => {
  return (
    <div
      className={classNames("image-normal-button", {
        disabled: props.disabled
      })}
      onClick={() => {
        if (!props.disabled) {
          props.onClick();
        }
      }}
    >
      <SliceImage
        className="image-normal-button__bg"
        image={`${process.env.PUBLIC_URL}/img/buttons/btn_completion.png`}
        top={10}
        right={10}
        bottom={11}
        left={9}
      />
      <span className="image-normal-button__label">{props.label}</span>
    </div>
  );
};

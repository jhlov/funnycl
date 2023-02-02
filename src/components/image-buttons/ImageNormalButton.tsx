import classNames from "classnames";
import { SliceImage } from "components/common/SliceImage";
import "./ImageNormalButton.scss";

interface Props {
  className?: string;
  label: string;
}

export const ImageNormalButton = (props: Props) => {
  return (
    <div className={classNames(props.className, "image-normal-button")}>
      <SliceImage
        className="image-normal-button__bg"
        image={`${process.env.PUBLIC_URL}/img/buttons/btn_close.png`}
        top={9}
        right={18}
        bottom={10}
        left={8}
      />
      <span className="image-normal-button__label">{props.label}</span>
    </div>
  );
};

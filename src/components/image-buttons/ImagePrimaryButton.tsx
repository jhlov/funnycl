import { SliceImage } from "components/common/SliceImage";
import "./ImageNormalButton.scss";

interface Props {
  label: string;
}

export const ImagePrimaryButton = (props: Props) => {
  return (
    <div className="image-normal-button">
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

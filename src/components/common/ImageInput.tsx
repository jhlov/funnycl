import { useRef, useState } from "react";
import { Button } from "react-bootstrap";

interface Props {
  image: File | string | null;
  onChangeImage: (v: File | null) => void;
  onChangeImageUrl: (v: string) => void;
}

export const ImageInput = (props: Props) => {
  const [imageName, setImageName] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClickAddImage = () => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.click();
  };

  const onLoadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      props.onChangeImageUrl(reader.result as string);
    };

    reader.readAsDataURL(e.target.files[0]);
    props.onChangeImage(e.target.files[0]);
    setImageName(e.target.value);
  };

  const onClickRemoveImage = () => {
    setImageName("");
    props.onChangeImage(null);
  };

  return (
    <>
      {props.image ? (
        <div className="d-flex">
          <div className="me-2">{imageName}</div>
          <Button variant="primary" size="sm" onClick={onClickRemoveImage}>
            이미지 제거
          </Button>
        </div>
      ) : (
        <Button variant="primary" size="sm" onClick={onClickAddImage}>
          <input
            className="d-none"
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onLoadImage}
          />
          이미지 추가
        </Button>
      )}
    </>
  );
};

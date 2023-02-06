interface Props {
  className?: string;
  image: string;
  top: number;
  right: number;
  bottom: number;
  left: number;
  topWidth?: number;
  rightWidth?: number;
  bottomWidth?: number;
  leftWidth?: number;
}

export const SliceImage = (props: Props) => {
  return (
    <div
      className={props.className}
      style={{
        borderImageSource: `url(${props.image})`,
        borderImageSlice: `${props.top} ${props.right} ${props.bottom} ${props.left} fill`,
        borderImageWidth: `${props.topWidth ?? props.top}px ${
          props.rightWidth ?? props.right
        }px ${props.bottomWidth ?? props.bottom}px ${
          props.leftWidth ?? props.left
        }px`
      }}
    />
  );
};

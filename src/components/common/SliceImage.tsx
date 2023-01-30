interface Props {
  className?: string;
  image: string;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const SliceImage = (props: Props) => {
  return (
    <div
      className={props.className}
      style={{
        borderImageSource: `url(${props.image})`,
        borderImageSlice: `${props.top} ${props.right} ${props.bottom} ${props.left} fill`,
        borderImageWidth: `${props.top}px ${props.right}px ${props.bottom}px ${props.left}px`
      }}
    />
  );
};

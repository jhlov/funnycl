import { Spinner } from "react-bootstrap";
import { useCommon } from "store/useCommon";
import "./LoadingLayer.scss";

export const LoadingLayer = () => {
  const { isLoading } = useCommon();

  return (
    <>
      {isLoading && (
        <div className="loading">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
};

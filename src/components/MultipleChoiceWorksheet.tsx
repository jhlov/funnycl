import { MultipleChoiceInfo } from "interfaces/MultipleChoiceInfo";
import { MultipleChoiceCircle } from "./MultipleChoiceCircle";

interface Props {
  multipleChoiceInfo: MultipleChoiceInfo;
}

export const MultipleChoiceWorksheet = (props: Props) => {
  return (
    <div className="multiple-choice-worksheet">
      {props.multipleChoiceInfo.answerList?.map((answer, i) => {
        return (
          <MultipleChoiceCircle
            x={answer.x}
            y={answer.y}
            checked={i === props.multipleChoiceInfo.rightAnswer}
          />
        );
      })}
    </div>
  );
};

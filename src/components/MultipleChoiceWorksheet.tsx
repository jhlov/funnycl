import { MultipleChoiceInfo } from "interfaces/MultipleChoiceInfo";
import { MultipleChoiceCircle } from "./MultipleChoiceCircle";

interface Props {
  multipleChoiceInfo: MultipleChoiceInfo;
  onClickCircle: (index: number) => void;
}

export const MultipleChoiceWorksheet = (props: Props) => {
  return (
    <div className="multiple-choice-worksheet">
      {props.multipleChoiceInfo.answerList?.map((answer, i) => {
        return (
          <MultipleChoiceCircle
            key={`${i}_${answer.x}_${answer.y}_${props.multipleChoiceInfo.rightAnswer}`}
            x={answer.x}
            y={answer.y}
            checked={i === props.multipleChoiceInfo.rightAnswer}
            onClickCircle={() => props.onClickCircle(i)}
          />
        );
      })}
    </div>
  );
};

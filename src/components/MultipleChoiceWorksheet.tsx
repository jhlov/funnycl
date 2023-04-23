import { MultipleChoiceInfo } from "interfaces/MultipleChoiceInfo";
import { MultipleChoiceCircle } from "./MultipleChoiceCircle";

interface Props {
  isEditable: boolean;
  multipleChoiceInfo: MultipleChoiceInfo;
  onChangePosition: (index: number, x: number, y: number) => void;
  onClickCircle: (index: number) => void;
}

export const MultipleChoiceWorksheet = (props: Props) => {
  return (
    <div className="multiple-choice-worksheet">
      {props.multipleChoiceInfo.answerList?.map((answer, i) => {
        return (
          <MultipleChoiceCircle
            key={`multiple-choice-circle-${i}`}
            isEditable={props.isEditable}
            x={answer.x}
            y={answer.y}
            checked={i === props.multipleChoiceInfo.rightAnswer}
            onChangePosition={(x, y) => props.onChangePosition(i, x, y)}
            onClickCircle={() => props.onClickCircle(i)}
          />
        );
      })}
    </div>
  );
};

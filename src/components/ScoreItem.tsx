import React from "react";
import { Group } from "types";

interface Props {
  group: Group;
}

const ScoreItem = (props: Props) => {
  return (
    <div className={`score-item mb-2 ${props.group.color}`}>
      <span>{props.group.name}</span>
      <span className="score-item-score">{props.group.score}</span>
    </div>
  );
};

export { ScoreItem };

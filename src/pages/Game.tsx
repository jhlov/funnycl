import { QuizItem } from "components/QuizItem";
import { ScoreItem } from "components/ScoreItem";
import React, { useEffect, useMemo } from "react";
import FlipMove from "react-flip-move";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { init } from "store/game";
import "./Game.scss";

const Game = () => {
  const dispatch = useDispatch();

  const quizList = useSelector((state: RootState) => state.game.quizList);
  const groupList = useSelector((state: RootState) => state.game.groupList);

  useEffect(() => {
    dispatch(init());
  }, []);

  const copyGroupList = useMemo(() => {
    return [...groupList];
  }, [groupList]);

  return (
    <div className="game">
      <div className="photo me-4">
        <img src={`${process.env.PUBLIC_URL}/img/1.jpg`} alt="" />
        <div className="quiz-list">
          {Array(16)
            .fill(0)
            .map((_, i) => (
              <QuizItem key={i} index={i} quiz={quizList[i]} />
            ))}
        </div>
      </div>
      <div className="score">
        <div className="title mb-5">SCORE</div>
        <div>
          <FlipMove>
            {copyGroupList
              .sort((a, b) => b?.score - a?.score)
              .map(group => (
                <div key={group.name}>
                  <ScoreItem group={group} />
                </div>
              ))}
          </FlipMove>
        </div>
      </div>
    </div>
  );
};

export { Game };

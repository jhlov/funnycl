import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { init } from "store/game";
import "./Game.scss";

const Game = () => {
  const dispatch = useDispatch();

  const quizList = useSelector((state: RootState) => state.game.quizList);

  useEffect(() => {
    dispatch(init());
  }, []);

  return (
    <div className="game">
      <h1>Game</h1>
      <div className="photo">
        <img src={`${process.env.PUBLIC_URL}/img/1.jpg`} alt="" />
        <div className="quiz-list">
          {Array(16)
            .fill(0)
            .map((_, i) => (
              <div className="quiz-item">i</div>
            ))}
        </div>
      </div>
    </div>
  );
};

export { Game };

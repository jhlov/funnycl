import { Quiz } from "interfaces/Quiz";
import create from "zustand";

interface State {
  quizList: Array<Quiz>;
  getQuizList: () => void;
}

export const useQuiz = create<State>(set => ({
  quizList: [],
  getQuizList: () => {
    console.log("getQuizList");
  }
}));

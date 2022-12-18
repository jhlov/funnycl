import { initNewQuiz, Quiz } from "interfaces/Quiz";
import create from "zustand";

interface State {
  quizList: Array<Quiz>;
  getQuizList: () => void;
  newQuiz: Quiz;
  initNewQuiz: () => void;
  setNewQuiz: (key: string, value: string) => void;
}

export const useQuiz = create<State>(set => ({
  quizList: [],
  getQuizList: () => {
    console.log("getQuizList");
  },
  newQuiz: initNewQuiz,
  initNewQuiz: () =>
    set(() => ({
      newQuiz: {
        ...initNewQuiz
      }
    })),
  setNewQuiz: (key: string, value: string) =>
    set(state => ({
      newQuiz: {
        ...state.newQuiz,
        [key]: value
      }
    }))
}));

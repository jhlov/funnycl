import { getAuth } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import { initNewQuiz, Quiz } from "interfaces/Quiz";
import _ from "lodash";
import create from "zustand";

interface State {
  quizList: Quiz[];
  getQuizList: () => void;
  newQuiz: Quiz;
  initNewQuiz: () => void;
  setNewQuiz: (key: string, value: any) => void;
}

export const useQuiz = create<State>(set => ({
  quizList: [],
  getQuizList: () => {
    console.log("getQuizList");
    const dbRef = ref(getDatabase());
    const quizUrl = `quiz/${getAuth().currentUser?.uid}`;
    get(child(dbRef, quizUrl))
      .then(snapshot => {
        if (snapshot.exists()) {
          set(() => ({
            quizList: _.reverse(
              _.sortBy<Quiz>(Object.values(snapshot.val()), "created")
            )
          }));
        } else {
          console.log("No data available");
        }
      })
      .catch(error => {
        console.error(error);
      });
  },
  newQuiz: initNewQuiz,
  initNewQuiz: () =>
    set(() => ({
      newQuiz: {
        ...initNewQuiz
      }
    })),
  setNewQuiz: (key: string, value: any) =>
    set(state => ({
      newQuiz: {
        ...state.newQuiz,
        [key]: value
      }
    }))
}));

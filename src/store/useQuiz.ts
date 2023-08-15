import { getAuth } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import { Quiz, initNewQuiz } from "interfaces/Quiz";
import _ from "lodash";
import create from "zustand";

interface State {
  quizList: Quiz[];
  getQuizList: () => void;
  newQuiz: Quiz;
  modifyQuizId: string;
  initNewQuiz: () => void;
  setNewQuiz: (key: string, value: any) => void;
  getQuizInfo: (id: string) => void;
}

export const useQuiz = create<State>(set => ({
  quizList: [],
  getQuizList: () => {
    const dbRef = ref(getDatabase());
    const quizUrl = `quiz/${getAuth().currentUser?.uid}`;
    get(child(dbRef, quizUrl))
      .then(snapshot => {
        if (snapshot.exists()) {
          set(() => ({
            quizList: _.reverse(
              _.sortBy<Quiz>(
                Object.values<Quiz>(snapshot.val()).filter(
                  item => !item.deleted
                ),
                "created"
              )
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
  modifyQuizId: "",
  initNewQuiz: () =>
    set(() => ({
      modifyQuizId: "",
      newQuiz: {
        ...initNewQuiz
      }
    })),
  setNewQuiz: (key: string, value: any) => {
    set(state => ({
      newQuiz: {
        ...state.newQuiz,
        [key]: value
      }
    }));

    // 새로운 문제 출제 일 때(type 이 변경 되었을 때), 저장한 정보를 넣는다.
    if (key === "type") {
      const lastQuizInfo = JSON.parse(
        localStorage.getItem("create_quiz_info") ?? "{}"
      );
      if (!_.isEmpty(lastQuizInfo)) {
        set(state => ({
          newQuiz: {
            ...state.newQuiz,
            subject: lastQuizInfo.subject,
            year: lastQuizInfo.year,
            keyword: lastQuizInfo.keyword,
            difficulty: lastQuizInfo.difficulty,
            score: lastQuizInfo.score
          }
        }));
      }
    }
  },
  getQuizInfo: (id: string) => {
    set(() => ({
      modifyQuizId: id
    }));

    const dbRef = ref(getDatabase());
    const quizUrl = `quiz/${getAuth().currentUser?.uid}/${id}`;
    get(child(dbRef, quizUrl))
      .then(snapshot => {
        if (snapshot.exists()) {
          set(() => ({
            newQuiz: snapshot.val()
          }));
        } else {
          console.log("No data available");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}));

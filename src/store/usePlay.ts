import { child, get as getData, getDatabase, ref } from "firebase/database";
import { Game } from "interfaces/Game";
import { Group } from "interfaces/Group";
import { Quiz } from "interfaces/Quiz";
import _ from "lodash";
import create from "zustand";

interface State {
  startGame: boolean;
  gameInfo: Game | null;
  getGameInfo: (id: string) => void;
  setGameInfo: (key: string, value: any) => void;
  quizList: Quiz[];
  getQuizList: () => void;
  groupList: Group[];
  updateGroupListScore: (groupName: string, score: number) => void;
}

export const usePlay = create<State>((set, get) => ({
  startGame: false,
  gameInfo: null,
  getGameInfo: id => {
    const dbRef = ref(getDatabase());
    const gameUrl = `game/all/${id}`;
    getData(child(dbRef, gameUrl))
      .then(snapshot => {
        if (snapshot.exists()) {
          set(() => ({
            gameInfo: snapshot.val()
          }));
        } else {
          console.log("No data available");
        }
      })
      .catch(error => {
        console.error(error);
      });
  },
  setGameInfo: (key: string, value: any) => {
    set(state => ({
      gameInfo: {
        ...(state.gameInfo as Game),
        [key]: value
      }
    }));
  },
  quizList: [],
  getQuizList: () => {
    const gameInfo = get().gameInfo;
    const dbRef = ref(getDatabase());
    const quizUrl = `quiz/${gameInfo?.userId}`;
    getData(child(dbRef, quizUrl))
      .then(snapshot => {
        if (snapshot.exists()) {
          let quizList = Object.values<Quiz>(snapshot.val());

          // 1. 필터링
          // 1-1. 과목
          if (gameInfo?.subject !== "랜덤") {
            quizList = quizList.filter(
              item => item.subject === gameInfo?.subject
            );
          }

          // 1-2. 과정 & 난이도
          quizList = quizList.filter(
            item =>
              Number(gameInfo?.yearStart!) <= Number(item.year) &&
              Number(item.year) <= Number(gameInfo?.yearEnd!) &&
              Number(gameInfo?.difficultyStart!) <= Number(item.difficulty) &&
              Number(item.difficulty) <= Number(gameInfo?.difficultyEnd!)
          );

          // 개수
          const quizCount = Number(gameInfo?.sizeX!) * Number(gameInfo?.sizeY!);
          while (quizList.length < quizCount) {
            quizList = [...quizList, ...quizList];
          }
          quizList = quizList.slice(0, quizCount);
          quizList = _.shuffle(quizList);

          const groupList = [
            {
              name: "A조",
              score: 0,
              color: "red"
            },
            {
              name: "B조",
              score: 0,
              color: "blue"
            },
            {
              name: "C조",
              score: 0,
              color: "green"
            },
            {
              name: "D조",
              score: 0,
              color: "purple"
            },
            {
              name: "E조",
              score: 0,
              color: "orange"
            }
          ];

          set(() => ({
            startGame: true,
            quizList,
            groupList: groupList.slice(0, Number(gameInfo?.groupCount))
          }));
        } else {
          console.log("No data available");
        }
      })
      .catch(error => {
        console.error(error);
      });
  },
  groupList: [],
  updateGroupListScore: (groupName: string, score: number) => {
    set(() => ({
      groupList: get().groupList.map(item =>
        item.name === groupName
          ? {
              ...item,
              score: item.score + Number(score)
            }
          : item
      )
    }));
  }
}));

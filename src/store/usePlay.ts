import { CONST } from "const";
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

  // 게임 시작 후 세팅
  quizList: Quiz[];
  initGame: () => void;
  groupList: Group[];
  keyList: number[];
  turn: number; // 턴제 진행 일때 사용
  updateGroupListScore: (groupName: string, score: number) => void;
  updateGroupListKey: (groupName: string, delta: number) => void;
  updateQuizListFinished: (index: number) => void;
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
            gameInfo: {
              ...snapshot.val(),
              isTurnPlay: snapshot.val().isTurnPlay ?? true
            }
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
  initGame: () => {
    const gameInfo = get().gameInfo;
    console.log(gameInfo);
    const dbRef = ref(getDatabase());
    const quizUrl = `quiz/${gameInfo?.userId}`;
    getData(child(dbRef, quizUrl))
      .then(snapshot => {
        if (snapshot.exists()) {
          let quizList = Object.values<Quiz>(snapshot.val()).filter(
            item => !item.deleted
          );

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
          quizList = _.shuffle(quizList);
          quizList = quizList.slice(0, quizCount);

          const groupList = Array(Number(gameInfo?.groupCount))
            .fill(0)
            .map((_, i) => ({
              name: (gameInfo?.groupNameList
                ? gameInfo?.groupNameList
                : CONST.DEFAULT_GROUP_NAME_LIST)[i],
              score: 0,
              color: CONST.DEFAULT_GROUP_COLOR_LIST[i]
            }));

          set(() => ({
            startGame: true,
            quizList,
            groupList,
            turn: 0,
            keyList: _.sampleSize(
              Array(quizCount)
                .fill(0)
                .map((_, i) => i),
              Math.round(quizCount / 4)
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
  groupList: [],
  keyList: [],
  turn: 0,
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
  },
  updateGroupListKey: (groupName: string, delta: number) => {
    set(() => ({
      groupList: get().groupList.map(item =>
        item.name === groupName
          ? {
              ...item,
              key: (item.key ?? 0) + delta
            }
          : item
      )
    }));
  },
  updateQuizListFinished: (index: number) => {
    set(() => ({
      quizList: get().quizList.map((item, i) =>
        i === index
          ? {
              ...item,
              finished: true
            }
          : item
      )
    }));
  }
}));

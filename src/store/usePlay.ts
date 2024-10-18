import { ItemType } from "aws-sdk/clients/ssmincidents";
import { GameWinModalProps } from "components/modals/GameWinModal";
import { CONST } from "const";
import { child, get as getData, getDatabase, ref } from "firebase/database";
import { Game } from "interfaces/Game";
import { Group } from "interfaces/Group";
import { Quiz } from "interfaces/Quiz";
import { UserInfo } from "interfaces/UserInfo";
import _ from "lodash";
import create from "zustand";

interface State {
  startGame: boolean;
  gameInfo: Game | null;
  userInfo?: UserInfo;
  getGameInfo: (id: string) => void;
  setGameInfo: (key: string, value: any) => void;
  getUserInfo: () => void;

  // 게임 시작 후 세팅
  quizList: Quiz[];
  groupList: Group[];
  turn: number; // 턴제 진행 일때 사용
  finished: boolean;
  gameWinModalProps: GameWinModalProps;
  initGame: () => void;
  updateGroupListScore: (groupName: string, score: number) => void;
  updateGroupListItem: (
    groupName: string,
    item: ItemType,
    delta: number
  ) => void;
  updateQuizListFinished: (index: number) => void;
  updateTurn: () => void;
  setFinished: () => void;
  setGameWinModalProps: (props: GameWinModalProps) => void;
  changeKeyItem: (aGroupName: string, bGroupName: string) => void;
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
  getUserInfo: () => {
    const dbRef = ref(getDatabase());
    const url = `userInfo/${get().gameInfo?.userId}`;

    getData(child(dbRef, url))
      .then(snapshot => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          set(() => ({
            userInfo: snapshot.val()
          }));
        } else {
          console.log("No data available");
          set(() => ({
            userInfo: {}
          }));
        }
      })
      .catch(error => {
        console.error(error);
      });
  },
  quizList: [],
  groupList: [],
  turn: 0,
  finished: false,
  gameWinModalProps: { show: false },
  initGame: () => {
    const gameInfo = get().gameInfo;
    console.log(gameInfo);
    const dbRef = ref(getDatabase());

    const isMaster = get().userInfo?.isMaster ?? false;
    const quizUrl = isMaster ? "quiz" : `quiz/${gameInfo?.userId}`;
    getData(child(dbRef, quizUrl))
      .then(snapshot => {
        if (snapshot.exists()) {
          let quizList: Quiz[] = isMaster
            ? ((Object.values(snapshot.val()) as { string: Quiz }[])
                .map((obj: { string: Quiz }) => Object.values(obj))
                .flat() as Quiz[])
            : Object.values(snapshot.val());

          quizList = quizList.filter(item => !item.deleted);

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

          // 객관식 랜덤일 경우 정답 섞기
          quizList = quizList.map(quiz => {
            if (
              quiz.type === "일반" &&
              quiz.answerType === "객관식" &&
              quiz.multipleChoiceInfo?.random
            ) {
              const answer =
                quiz.multipleChoiceInfo.answerStringList![
                  quiz.multipleChoiceInfo.rightAnswer!
                ];

              let answerStringList = [
                ...quiz.multipleChoiceInfo.answerStringList!
              ];
              answerStringList.splice(quiz.multipleChoiceInfo.rightAnswer!, 1);
              answerStringList = _.shuffle(answerStringList);
              const rightAnswer = _.random(quiz.multipleChoiceInfo.count - 1);
              answerStringList.splice(rightAnswer, 0, answer);

              return {
                ...quiz,
                multipleChoiceInfo: {
                  ...quiz.multipleChoiceInfo,
                  answerStringList,
                  rightAnswer
                }
              };
            }

            return quiz;
          });

          const groupList = Array(Number(gameInfo?.groupCount))
            .fill(0)
            .map((_, i) => ({
              name: (gameInfo?.groupNameList
                ? gameInfo?.groupNameList
                : CONST.DEFAULT_GROUP_NAME_LIST)[i],
              score: 0,
              color: CONST.DEFAULT_GROUP_COLOR_LIST[i],
              items: {}
            }));

          set(() => ({
            startGame: true,
            quizList,
            groupList,
            turn: 0
          }));
        } else {
          console.log("No data available");
        }
      })
      .catch(error => {
        console.error(error);
      });
  },
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
  updateGroupListItem: (groupName: string, item: ItemType, delta: number) => {
    set(() => ({
      groupList: get().groupList.map(group =>
        group.name === groupName
          ? {
              ...group,
              items: {
                ...group.items,
                [item]: (group.items[item] ?? 0) + delta
              }
            }
          : group
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
  },
  updateTurn: () => {
    set(() => ({
      turn: (get().turn + 1) % get().groupList.length
    }));
  },
  setFinished: () => {
    set(() => ({
      finished: true
    }));
  },
  setGameWinModalProps: (props: GameWinModalProps) => {
    set(() => ({
      gameWinModalProps: props
    }));
  },
  changeKeyItem: (aGroupName: string, bGroupName: string) => {
    const aGroupKeyCount =
      get().groupList.find(group => group.name === aGroupName)?.items["KEY"] ??
      0;
    const bGroupKeyCount =
      get().groupList.find(group => group.name === bGroupName)?.items["KEY"] ??
      0;
    set(() => ({
      groupList: get().groupList.map(group => {
        if (group.name === aGroupName) {
          return {
            ...group,
            items: {
              ...group.items,
              ["KEY"]: bGroupKeyCount
            }
          };
        } else if (group.name === bGroupName) {
          return {
            ...group,
            items: {
              ...group.items,
              ["KEY"]: aGroupKeyCount
            }
          };
        }

        return group;
      })
    }));
  }
}));

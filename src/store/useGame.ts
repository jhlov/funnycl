import { getAuth } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import { Game, initNewGame } from "interfaces/Game";
import _ from "lodash";
import create from "zustand";

interface State {
  gameList: Game[];
  getGameList: () => void;
  newGame: Game;
  initNewGame: () => void;
  setNewGame: (key: string, value: any) => void;
}

export const useGame = create<State>(set => ({
  gameList: [],
  getGameList: () => {
    console.log("getGameList");
    const dbRef = ref(getDatabase());
    const quizUrl = `game/${getAuth().currentUser?.uid}`;
    get(child(dbRef, quizUrl))
      .then(snapshot => {
        if (snapshot.exists()) {
          set(() => ({
            gameList: _.sortBy(Object.values(snapshot.val()), "created")
          }));
        } else {
          console.log("No data available");
        }
      })
      .catch(error => {
        console.error(error);
      });
  },
  newGame: initNewGame,
  initNewGame: () =>
    set(() => ({
      newGame: {
        ...initNewGame
      }
    })),
  setNewGame: (key: string, value: any) =>
    set(state => ({
      newGame: {
        ...state.newGame,
        [key]: value
      }
    }))
}));

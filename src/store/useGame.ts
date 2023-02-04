import { getAuth } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import { Game, initNewGame } from "interfaces/Game";
import _ from "lodash";
import create from "zustand";

interface State {
  gameList: Game[];
  newGame: Game;
  modifyGameId: string;
  //////
  getGameList: () => void;
  initNewGame: () => void;
  setNewGame: (key: string, value: any) => void;
  getGameInfo: (id: string) => void;
}

export const useGame = create<State>(set => ({
  gameList: [],
  newGame: initNewGame,
  modifyGameId: "",
  //////
  getGameList: () => {
    const dbRef = ref(getDatabase());
    const gameUrl = `game/${getAuth().currentUser?.uid}`;
    get(child(dbRef, gameUrl))
      .then(snapshot => {
        if (snapshot.exists()) {
          set(() => ({
            gameList: _.reverse(
              _.sortBy<Game>(
                Object.values<Game>(snapshot.val()).filter(
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

  initNewGame: () =>
    set(() => ({
      modifyGameId: "",
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
    })),
  getGameInfo: (id: string) => {
    set(() => ({
      modifyGameId: id
    }));

    const dbRef = ref(getDatabase());
    const quizUrl = `game/${getAuth().currentUser?.uid}/${id}`;
    get(child(dbRef, quizUrl))
      .then(snapshot => {
        if (snapshot.exists()) {
          set(() => ({
            newGame: snapshot.val()
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

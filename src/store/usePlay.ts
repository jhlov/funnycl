import { child, get, getDatabase, ref } from "firebase/database";
import { Game } from "interfaces/Game";
import create from "zustand";

interface State {
  gameInfo: Game | null;
  getGameInfo: (id: string) => void;
}

export const usePlay = create<State>(set => ({
  gameInfo: null,
  getGameInfo: id => {
    const dbRef = ref(getDatabase());
    const gameUrl = `game/all/${id}`;
    get(child(dbRef, gameUrl))
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
  }
}));

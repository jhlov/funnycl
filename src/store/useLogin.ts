import { getAuth } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import { UserInfo } from "interfaces/UserInfo";
import create from "zustand";

interface LoginState {
  isLogin: boolean;
  userInfo?: UserInfo;
  //////////////////////////////////////////////////
  setIsLogin: (payload: boolean) => void;
  getUserInfo: () => void;
}

export const useLogin = create<LoginState>(set => ({
  isLogin: false,
  //////////////////////////////////////////////////
  setIsLogin: payload =>
    set(() => ({
      isLogin: payload
    })),
  getUserInfo: () => {
    const dbRef = ref(getDatabase());
    const url = `userInfo/${getAuth().currentUser?.uid}`;

    get(child(dbRef, url))
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
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
  }
}));

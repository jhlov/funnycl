import axios from "axios";
import { getAuth } from "firebase/auth";
import { child, getDatabase, push, ref, update } from "firebase/database";
import _ from "lodash";
import moment from "moment";
import { useMemo } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useGame } from "store/useGame";
import "./Header.scss";

export const SaveGameButton = () => {
  const auth = getAuth();
  const { gameList, newGame } = useGame();
  const history = useHistory();

  const disabledSaveButton = useMemo(() => {
    if (_.isEmpty(newGame.title)) {
      return true;
    }

    // 이름 중복
    if (
      newGame.title &&
      0 < gameList.filter(item => item.title === newGame.title).length
    ) {
      return true;
    }

    if (newGame.type === "숨겨진그림") {
      if (newGame.image === null) {
        return true;
      }
    }

    return false;
  }, [newGame, gameList]);

  const onClickSaveGame = async () => {
    console.log("onClickSaveGame");

    if (_.isNil(auth.currentUser?.uid)) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 이미지를 저장 하고
    const formData = new FormData();
    formData.append("image", newGame.image!);

    const r = await axios.post(
      "https://l0519szlp6.execute-api.ap-northeast-2.amazonaws.com/default/fc-uploadImage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    if (r.data.success === true) {
      const db = getDatabase();

      // Get a key for a new Post.
      const newPostKey = push(child(ref(db), "game/all")).key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const gameData = _.omit(
        {
          ...newGame,
          id: newPostKey,
          userId: auth.currentUser?.uid,
          image: r.data.data,
          created: moment().utc(false).add(9, "h").format("YYYY-MM-DD HH:mm:ss")
        },
        ["imageUrl"]
      );

      const updates: any = {};
      updates[`game/all/${newPostKey}`] = gameData;
      updates[`game/${auth.currentUser?.uid}/${newPostKey}`] = gameData;

      const updateResult = await update(ref(db), updates);
      alert("새로운 게임 저장에 성공하였습니다.");
      history.push("/admin/game/list");
    } else {
      alert("이미지 저장에 실패하였습니다.");
    }
  };

  return (
    <Button size="sm" disabled={disabledSaveButton} onClick={onClickSaveGame}>
      저장
    </Button>
  );
};

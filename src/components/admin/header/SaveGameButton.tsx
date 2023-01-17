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

    return false;
  }, [newGame, gameList]);

  const onClickSaveGame = async () => {
    console.log("onClickSaveGame");

    if (_.isNil(auth.currentUser?.uid)) {
      alert("로그인이 필요합니다.");
      return;
    }

    const db = getDatabase();

    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), "game/all")).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const gameData = {
      ...newGame,
      id: newPostKey,
      userId: auth.currentUser?.uid,
      created: moment().utc(false).add(9, "h").format("YYYY-MM-DD HH:mm:ss")
    };

    const updates: any = {};
    updates[`game/all/${newPostKey}`] = gameData;
    updates[`game/${auth.currentUser?.uid}/${newPostKey}`] = gameData;

    const updateResult = await update(ref(db), updates);
    alert("새로운 게임 저장에 성공하였습니다.");
    history.push("/admin/game/list");
  };

  return (
    <Button size="sm" disabled={disabledSaveButton} onClick={onClickSaveGame}>
      저장
    </Button>
  );
};

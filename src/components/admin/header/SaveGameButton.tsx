import axios from "api";
import { getAuth } from "firebase/auth";
import { child, getDatabase, push, ref, update } from "firebase/database";
import _ from "lodash";
import moment from "moment";
import { useMemo } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useGame } from "store/useGame";
import { useMenus } from "store/useMenus";
import "./Header.scss";

export const SaveGameButton = () => {
  const auth = getAuth();
  const { gameList, newGame, modifyGameId } = useGame();
  const { subMenu } = useMenus();
  const history = useHistory();

  const disabledSaveButton = useMemo(() => {
    if (_.isEmpty(newGame.title)) {
      return true;
    }

    // 이름 중복
    if (
      newGame.title &&
      0 <
        gameList.filter(
          item => item.id !== modifyGameId && item.title === newGame.title
        ).length
    ) {
      return true;
    }

    if (newGame.type === "숨겨진그림") {
      if (!newGame.hiddenPictureAnswer) {
        return true;
      }

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
    let image = "";
    if (typeof newGame.image === "object") {
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

      if (r.data.success) {
        image = r.data.data;
      } else {
        alert("이미지 저장에 실패하였습니다.");
        return;
      }
    } else {
      image = newGame.image;
    }

    const db = getDatabase();

    // Get a key for a new Post.
    const postKey =
      subMenu === "CREATE_GAME"
        ? push(child(ref(db), "game/all")).key
        : modifyGameId;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const gameData = _.omit(
      {
        ...newGame,
        id: postKey,
        userId: auth.currentUser?.uid,
        image
      },
      ["imageUrl"]
    );

    if (subMenu === "CREATE_GAME") {
      gameData["created"] = moment()
        .utc(false)
        .add(9, "h")
        .format("YYYY-MM-DD HH:mm:ss");
    } else {
      gameData["modified"] = moment()
        .utc(false)
        .add(9, "h")
        .format("YYYY-MM-DD HH:mm:ss");
    }

    const updates: any = {};
    updates[`game/all/${postKey}`] = _.pickBy(gameData);
    updates[`game/${auth.currentUser?.uid}/${postKey}`] = _.pickBy(gameData);

    await update(ref(db), updates);
    alert(
      subMenu === "CREATE_QUIZ"
        ? "새로운 게임 저장에 성공하였습니다."
        : "게임 수정에 성공하였습니다"
    );
    history.push("/admin/game/list");
  };

  return (
    <Button size="sm" disabled={disabledSaveButton} onClick={onClickSaveGame}>
      {subMenu === "CREATE_GAME" ? "저장" : "수정"}
    </Button>
  );
};

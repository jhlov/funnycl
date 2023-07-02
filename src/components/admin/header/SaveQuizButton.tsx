import axios from "api";
import { getAuth } from "firebase/auth";
import { child, getDatabase, push, ref, update } from "firebase/database";
import _ from "lodash";
import moment from "moment";
import { useMemo } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useMenus } from "store/useMenus";
import { useQuiz } from "store/useQuiz";

export const SaveQuizButton = () => {
  const auth = getAuth();
  const { quizList, newQuiz, modifyQuizId } = useQuiz();
  const { subMenu } = useMenus();
  const history = useHistory();

  const exceptKeys = useMemo<string[]>(() => {
    const keys = ["imageUrl"];
    if (newQuiz.answerType === "객관식") {
      keys.push("shortAnswerQuestionInfo", "oxAnswer");
    } else if (newQuiz.answerType === "단답형") {
      keys.push("multipleChoiceInfo", "oxAnswer");
    } else if (newQuiz.answerType === "OX") {
      keys.push("shortAnswerQuestionInfo", "multipleChoiceInfo");
    }

    return keys;
  }, [newQuiz.answerType]);

  const disabledSaveButton = useMemo(() => {
    if (_.isEmpty(newQuiz.title)) {
      return true;
    }

    // 이름 중복
    if (
      newQuiz.title &&
      0 <
        quizList.filter(
          item => item.id !== modifyQuizId && item.title === newQuiz.title
        ).length
    ) {
      return true;
    }

    if (newQuiz.type === "일반") {
      if (!newQuiz.content) {
        return true;
      }

      if (newQuiz.answerType === "객관식") {
        if (
          newQuiz.multipleChoiceInfo?.answerStringList?.some(answer => !answer)
        ) {
          return true;
        }
      }
    } else if (newQuiz.type === "워크시트") {
      if (newQuiz.image === null) {
        return true;
      }
    }

    if (newQuiz.answerType === "단답형") {
      if (_.isEmpty(newQuiz.shortAnswerQuestionInfo?.answer)) {
        return true;
      }
    }

    return false;
  }, [newQuiz, quizList, modifyQuizId]);

  const onClickSaveQuiz = async () => {
    console.log("onClickSaveQuiz");

    if (_.isNil(auth.currentUser?.uid)) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 이미지를 저장 하고
    let image: string | null = "";
    if (newQuiz.image && typeof newQuiz.image === "object") {
      const formData = new FormData();
      formData.append("image", newQuiz.image!);

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
      image = newQuiz.image;
    }

    const db = getDatabase();

    // Get a key for a new Post.
    const quizUrl = `quiz/${auth.currentUser?.uid}`;
    const postKey =
      subMenu === "CREATE_QUIZ"
        ? push(child(ref(db), quizUrl)).key
        : modifyQuizId;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const quizData = _.omit(
      {
        ...newQuiz,
        id: postKey,
        image
      },
      exceptKeys
    );

    if (subMenu === "CREATE_QUIZ") {
      quizData["created"] = moment()
        .utc(false)
        .add(9, "h")
        .format("YYYY-MM-DD HH:mm:ss");
    } else {
      quizData["modified"] = moment()
        .utc(false)
        .add(9, "h")
        .format("YYYY-MM-DD HH:mm:ss");
    }

    const updates: any = {};
    updates[`${quizUrl}/${postKey}`] = _.pickBy(
      quizData,
      value => !_.isNil(value) && value !== ""
    );

    await update(ref(db), updates);
    alert(
      subMenu === "CREATE_QUIZ"
        ? "새로운 문제 저장에 성공하였습니다."
        : "문제 수정에 성공하였습니다"
    );
    history.push("/admin/quiz/list");
  };

  return (
    <Button size="sm" disabled={disabledSaveButton} onClick={onClickSaveQuiz}>
      {subMenu === "CREATE_QUIZ" ? "저장" : "수정"}
    </Button>
  );
};

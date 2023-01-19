import axios from "axios";
import { getAuth } from "firebase/auth";
import { child, getDatabase, push, ref, update } from "firebase/database";
import _ from "lodash";
import moment from "moment";
import { useMemo } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useQuiz } from "store/useQuiz";

export const SaveQuizButton = () => {
  const auth = getAuth();
  const { quizList, newQuiz } = useQuiz();
  const history = useHistory();

  const disabledSaveButton = useMemo(() => {
    if (_.isEmpty(newQuiz.title)) {
      return true;
    }

    // 이름 중복
    if (
      newQuiz.title &&
      0 < quizList.filter(item => item.title === newQuiz.title).length
    ) {
      return true;
    }

    if (!newQuiz.keyword) {
      return true;
    }

    if (newQuiz.type === "워크시트") {
      if (newQuiz.image === null) {
        return true;
      }

      if (newQuiz.answerType === "단답형") {
        if (_.isEmpty(newQuiz.shortAnswerQuestionInfo?.answer)) {
          return true;
        }
      } else {
        return true;
      }
    }

    return false;
  }, [newQuiz, quizList]);

  const onClickSaveQuiz = async () => {
    console.log("onClickSaveQuiz");

    if (_.isNil(auth.currentUser?.uid)) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 이미지를 저장 하고
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

    if (r.data.success === true) {
      const db = getDatabase();

      // Get a key for a new Post.
      const quizUrl = `quiz/${auth.currentUser?.uid}`;
      const newPostKey = push(child(ref(db), quizUrl)).key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates: any = {};
      updates[`${quizUrl}/${newPostKey}`] = _.omit(
        {
          ...newQuiz,
          id: newPostKey,
          image: r.data.data,
          created: moment().utc(false).add(9, "h").format("YYYY-MM-DD HH:mm:ss")
        },
        ["imageUrl"]
      );

      const updateResult = await update(ref(db), updates);
      alert("새로운 문제 저장에 성공하였습니다.");
      history.push("/admin/quiz/list");
    } else {
      alert("이미지 저장에 실패하였습니다.");
    }
  };

  return (
    <Button size="sm" disabled={disabledSaveButton} onClick={onClickSaveQuiz}>
      저장
    </Button>
  );
};

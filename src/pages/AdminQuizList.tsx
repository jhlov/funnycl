import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import classNames from "classnames";
import { CONST } from "const";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import { Quiz } from "interfaces/Quiz";
import _ from "lodash";
import moment from "moment";
import { useEffect } from "react";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLogin } from "store/useLogin";
import { useMenus } from "store/useMenus";
import { useQuiz } from "store/useQuiz";
import "./AdminQuizList.scss";

const shortYearList = [
  [1, "초1"],
  [2, "초2"],
  [3, "초3"],
  [4, "초4"],
  [5, "초5"],
  [6, "초6"],
  [7, "중1"],
  [8, "중2"],
  [9, "중3"],
  [10, "고1"],
  [11, "고2"],
  [12, "고3"]
];

const AdminQuizList = () => {
  const auth = getAuth();
  const { setSubMenu } = useMenus();
  const { userInfo } = useLogin();
  const { quizList, getQuizList } = useQuiz();

  useEffect(() => {
    setSubMenu("QUIZ_LIST");
  }, []);

  useEffect(() => {
    if (userInfo) {
      getQuizList();
    }
  }, [userInfo]);

  const onClickRemoveQuiz = (id: string) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const db = getDatabase();

      const updates: any = {};
      updates[`quiz/${auth.currentUser?.uid}/${id}/deleted`] = moment()
        .utc(false)
        .add(9, "h")
        .format("YYYY-MM-DD HH:mm:ss");

      update(ref(db), updates).then(() => {
        getQuizList();
      });
    }
  };

  const getQuizContent = (quiz: Quiz) => {
    return (
      <>
        {quiz.type === "일반" && <div>{quiz.content}</div>}
        {quiz.image && (
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id={`image-tooltip-${quiz.id}`}>
                <img style={{ maxWidth: "500px" }} src={quiz.image as string} />
              </Tooltip>
            }
          >
            <img
              className="admin-quiz-list__image"
              src={quiz.image as string}
            />
          </OverlayTrigger>
        )}
      </>
    );
  };

  const getQuizAnswer = (quiz: Quiz) => {
    if (quiz.answerType === "단답형") {
      return quiz.shortAnswerQuestionInfo?.answer;
    } else if (quiz.answerType === "객관식") {
      if (!_.isEmpty(quiz.multipleChoiceInfo?.answerList)) {
        return quiz.multipleChoiceInfo?.rightAnswer;
      } else if (!_.isEmpty(quiz.multipleChoiceInfo?.answerStringList)) {
        return (quiz.multipleChoiceInfo?.answerStringList ?? [])[
          quiz.multipleChoiceInfo?.rightAnswer ?? 0
        ];
      }
    } else if (quiz.answerType === "OX") {
      return quiz.oxAnswer ? "O" : "X";
    }
  };

  return (
    <div className="admin-quiz-list p-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "40px", minWidth: "40px" }}>#</th>
            <th style={{ width: "100px", minWidth: "100px" }}>타입</th>
            <th>문제 이름</th>
            <th>문제 내용</th>
            <th>답</th>
            <th style={{ width: "60px", minWidth: "60px" }}>과목</th>
            <th style={{ width: "60px", minWidth: "60px" }}>학년</th>
            <th style={{ width: "120px", minWidth: "120px" }}>제시어</th>
            <th style={{ width: "80px", minWidth: "80px" }}>난이도</th>
            <th style={{ width: "60px", minWidth: "60px" }}>점수</th>
            <th style={{ width: "100px", minWidth: "100px" }}>문제유형</th>
            <th style={{ width: "120px", minWidth: "120px" }}>생성일</th>
            <th style={{ width: "120px", minWidth: "120px" }}>수정일</th>
            <th style={{ width: "60px", minWidth: "60px" }}>수정</th>
            <th style={{ width: "60px", minWidth: "60px" }}>삭제</th>
          </tr>
        </thead>
        <tbody>
          {quizList.map((item: Quiz, i) => (
            <tr
              key={item.id}
              className={classNames({
                "fw-bold":
                  userInfo?.isMaster && item.userId === auth.currentUser?.uid
              })}
            >
              <td>{i + 1}</td>
              <td>{item.type}</td>
              <td className="text-start admin-quiz-list__title">
                {item.title}
              </td>
              <td>{getQuizContent(item)}</td>
              <td>{getQuizAnswer(item)}</td>
              <td>{item.subject}</td>
              <td>{shortYearList[item.year - 1][1]}</td>
              <td className="text-start">{item.keyword}</td>
              <td>{item.difficulty}</td>
              <td>{item.score ?? CONST.DEFAULT_SCORE}</td>
              <td>{item.answerType}</td>
              <td>{item.created}</td>
              <td>{item.modified}</td>
              <td>
                <Link className="btn" to={`/admin/quiz/modify/${item.id}`}>
                  <EditIcon />
                </Link>
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() => onClickRemoveQuiz(item.id!)}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export { AdminQuizList };

import DeleteIcon from "@mui/icons-material/Delete";
import { yearList } from "components/admin/quiz/NewQuizInfo";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import moment from "moment";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useMenus } from "store/useMenus";
import { useQuiz } from "store/useQuiz";
import "./AdminQuizList.scss";

const AdminQuizList = () => {
  const auth = getAuth();
  const { setSubMenu } = useMenus();
  const { quizList, getQuizList } = useQuiz();

  useEffect(() => {
    setSubMenu("QUIZ_LIST");
    getQuizList();
  }, []);

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

  return (
    <div className="admin-quiz-list p-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "40px" }}>#</th>
            <th style={{ width: "120px" }}>타입</th>
            <th>문제 이름</th>
            <th>이미지</th>
            <th style={{ width: "100px" }}>과목</th>
            <th style={{ width: "120px" }}>학년</th>
            <th style={{ width: "120px" }}>제시어</th>
            <th style={{ width: "100px" }}>난이도</th>
            <th style={{ width: "120px" }}>문제유형</th>
            <th style={{ width: "120px" }}>생성일</th>
            <th style={{ width: "80px" }}>삭제</th>
          </tr>
        </thead>
        <tbody>
          {quizList.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.type}</td>
              <td className="text-start">{item.title}</td>
              <td>
                {item.image && (
                  <img
                    className="admin-quiz-list__image"
                    src={item.image as string}
                  />
                )}
              </td>
              <td>{item.subject}</td>
              <td>{yearList[item.year - 1][1]}</td>
              <td className="text-start">{item.keyword}</td>
              <td>{item.difficulty}</td>
              <td>{item.answerType}</td>
              <td>{item.created}</td>
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

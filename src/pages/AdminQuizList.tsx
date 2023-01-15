import { yearList } from "components/admin/quiz/NewQuizInfo";
import { getAuth } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import { Quiz } from "interfaces/Quiz";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useMenus } from "store/useMenus";
import "./AdminQuizList.scss";

const AdminQuizList = () => {
  const auth = getAuth();
  const { setSubMenu } = useMenus();
  const [quizList, setQuizList] = useState<Quiz[]>([]);

  useEffect(() => {
    setSubMenu("QUIZ_LIST");

    const dbRef = ref(getDatabase());
    const quizUrl = `quiz/${auth.currentUser?.uid}`;
    get(child(dbRef, quizUrl))
      .then(snapshot => {
        if (snapshot.exists()) {
          setQuizList(_.sortBy(Object.values(snapshot.val()), "created"));
        } else {
          console.log("No data available");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="admin-quiz-list p-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "40px" }}>#</th>
            <th style={{ width: "120px" }}>타입</th>
            <th>문제 이름</th>
            <th style={{ width: "100px" }}>과목</th>
            <th style={{ width: "120px" }}>학년</th>
            <th style={{ width: "100px" }}>난이도</th>
            <th style={{ width: "120px" }}>문제유형</th>
          </tr>
        </thead>
        <tbody>
          {quizList.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.type}</td>
              <td className="text-start">{item.title}</td>
              <td>{item.subject}</td>
              <td>{yearList[item.year - 1][1]}</td>
              <td>{item.difficulty}</td>
              <td>{item.answerType}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export { AdminQuizList };

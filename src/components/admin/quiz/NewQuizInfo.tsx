import { CONST } from "const";
import { answerTypetList, quizSubjectList } from "interfaces/Quiz";
import Form from "react-bootstrap/Form";
import { useQuiz } from "store/useQuiz";
import "./NewQuizInfo.scss";

export const yearList = [
  [1, "초등학교 1학년"],
  [2, "초등학교 2학년"],
  [3, "초등학교 3학년"],
  [4, "초등학교 4학년"],
  [5, "초등학교 5학년"],
  [6, "초등학교 6학년"],
  [7, "중학교 1학년"],
  [8, "중학교 2학년"],
  [9, "중학교 3학년"],
  [10, "고등학교 1학년"],
  [11, "고등학교 2학년"],
  [12, "고등학교 3학년"]
];

const NewQuizInfo = () => {
  const { newQuiz, setNewQuiz } = useQuiz();

  return (
    <div className="new-quiz-info p-3">
      <Form className="text-start">
        <Form.Group className="mb-4">
          <Form.Label>과목</Form.Label>
          <Form.Select
            value={newQuiz.subject}
            onChange={e => setNewQuiz("subject", e.target.value)}
          >
            {quizSubjectList.map(item => (
              <option key={`subject_${item}`} value={item}>
                {item}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>학년</Form.Label>
          <Form.Select
            value={newQuiz.year}
            onChange={e => setNewQuiz("year", e.target.value)}
          >
            {yearList.map(item => (
              <option key={`year_${item[0]}`} value={item[0]}>
                {item[1]}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>제시어</Form.Label>
          <Form.Control
            type="text"
            value={newQuiz.keyword}
            onChange={e => setNewQuiz("keyword", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>난이도</Form.Label>
          <Form.Select
            value={newQuiz.difficulty}
            onChange={e => setNewQuiz("difficulty", e.target.value)}
          >
            {Array(CONST.DIFFICULTY_END)
              .fill(0)
              .map((_, i) => (
                <option key={`difficulty_${i}`} value={i + 1}>
                  {i + 1}
                </option>
              ))}
          </Form.Select>
          <Form.Text>1: 쉬운 ~ 10: 어려움</Form.Text>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>점수</Form.Label>
          <Form.Control
            type="number"
            value={newQuiz.score}
            onChange={e => setNewQuiz("score", Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>문제유형</Form.Label>
          <Form.Select
            value={newQuiz.answerType}
            onChange={e => setNewQuiz("answerType", e.target.value)}
          >
            {answerTypetList
              .filter(type =>
                newQuiz.type === "워크시트" ? type === "단답형" : true
              )
              .map(item => (
                <option key={`answerType_${item}`} value={item}>
                  {item}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
      </Form>
    </div>
  );
};

export { NewQuizInfo };

import classNames from "classnames";
import { CONST } from "const";
import _ from "lodash";
import { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useQuiz } from "store/useQuiz";

// 일반 문제, 객관식
export const MultipleChoiceNormal = () => {
  const { newQuiz, setNewQuiz } = useQuiz();

  useEffect(() => {
    if (!newQuiz.multipleChoiceInfo) {
      setNewQuiz("multipleChoiceInfo", {
        random: true,
        count: CONST.DEFAULT_MULTIPLE_CHIOCE_COUNT,
        rightAnswer: 0,
        answerStringList: Array(CONST.DEFAULT_MULTIPLE_CHIOCE_COUNT)
          .fill(0)
          .map(() => "")
      });
    }
    console.log("mounted");
  }, []);

  const onChangeCount = (count: number) => {
    const prevAnswerStringList =
      newQuiz.multipleChoiceInfo?.answerStringList ?? [];
    const answerStringList =
      count < prevAnswerStringList.length
        ? prevAnswerStringList.slice(0, count)
        : [
            ...prevAnswerStringList,
            ...Array(count - prevAnswerStringList.length).map(() => "")
          ].flat();

    setNewQuiz("multipleChoiceInfo", {
      ..._.cloneDeep(newQuiz.multipleChoiceInfo),
      answerStringList,
      count
    });
  };

  const onChangeRightAnswer = (answer: string) => {
    const answerStringList = [
      ...(newQuiz.multipleChoiceInfo?.answerStringList ?? [])
    ];
    answerStringList[0] = answer;

    setNewQuiz("multipleChoiceInfo", {
      ..._.cloneDeep(newQuiz.multipleChoiceInfo),
      answerStringList
    });
  };

  const onChangeWrongAnswer = (i: number, answer: string) => {
    const answerStringList = [
      ...(newQuiz.multipleChoiceInfo?.answerStringList ?? [])
    ];
    answerStringList[i] = answer;

    setNewQuiz("multipleChoiceInfo", {
      ..._.cloneDeep(newQuiz.multipleChoiceInfo),
      answerStringList
    });
  };

  return (
    <div className="multiple-choice-normal">
      <Form.Group className="mb-1">
        <Row>
          <Col xs="2">
            <Form.Label>문항 수</Form.Label>
          </Col>
          <Col xs="4">
            <Form.Select
              value={
                newQuiz.multipleChoiceInfo?.count ??
                CONST.DEFAULT_MULTIPLE_CHIOCE_COUNT
              }
              onChange={e => onChangeCount(Number(e.target.value))}
            >
              {[3, 4, 5].map(item => (
                <option key={`count_${item}`} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-1">
        <Row>
          <Col xs="2">
            <Form.Label>정답</Form.Label>
          </Col>
          <Col xs="4">
            <Form.Control
              type="text"
              className={classNames({
                "border-danger": !(newQuiz.multipleChoiceInfo
                  ?.answerStringList ?? [])[
                  newQuiz.multipleChoiceInfo?.rightAnswer ?? 0
                ]
              })}
              value={
                (newQuiz.multipleChoiceInfo?.answerStringList ?? [])[
                  newQuiz.multipleChoiceInfo?.rightAnswer ?? 0
                ] ?? ""
              }
              onChange={e => onChangeRightAnswer(e.target.value)}
            />
          </Col>
        </Row>
      </Form.Group>
      {Array(
        (newQuiz.multipleChoiceInfo?.count ??
          CONST.DEFAULT_MULTIPLE_CHIOCE_COUNT) - 1
      )
        .fill(0)
        .map((_, i) => (
          <Form.Group key={`wrong-answer-${i}`} className="mb-1">
            <Row>
              <Col xs="2">
                <Form.Label>오답 {i + 1}</Form.Label>
              </Col>
              <Col xs="4">
                <Form.Control
                  type="text"
                  className={classNames({
                    "border-danger": !(newQuiz.multipleChoiceInfo
                      ?.answerStringList ?? [])[i + 1]
                  })}
                  value={
                    (newQuiz.multipleChoiceInfo?.answerStringList ?? [])[
                      i + 1
                    ] ?? ""
                  }
                  onChange={e => onChangeWrongAnswer(i + 1, e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
        ))}
    </div>
  );
};

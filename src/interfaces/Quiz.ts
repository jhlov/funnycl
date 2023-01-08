import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";

type QuizType = "NONE" | "NORMAL" | "WORK_SHEET";

export type QuizSubject = "KOREAN" | "MATH";
type AnswerType = "SHORT_ANSWER_QUESTION" | "MULTIPLE_CHOICE";

export const quizSubjectList = [
  ["KOREAN", "국어"],
  ["MATH", "수학"]
];

export const answerTypetList = [
  ["SHORT_ANSWER_QUESTION", "단답형"],
  ["MULTIPLE_CHOICE", "객관식"]
];

export interface Quiz {
  title: string;
  type: QuizType;
  subject: QuizSubject;
  year: number; // 1 ~ 12
  tag: string;
  difficulty: number; // 1 ~ 10;
  answerType: AnswerType;
  answer: string;
  hint: string;
  image: File | null;
  imageName: string;
  imageUrl: string;
  shortAnswerQuestionInfo: ShortAnswerQuestionInfo | null;
}

export const initNewQuiz: Quiz = {
  title: "",
  type: "NONE",
  subject: "KOREAN",
  year: 1,
  tag: "",
  difficulty: 1,
  answerType: "SHORT_ANSWER_QUESTION",
  answer: "",
  hint: "",
  image: null,
  imageName: "",
  imageUrl: "",
  shortAnswerQuestionInfo: null
};

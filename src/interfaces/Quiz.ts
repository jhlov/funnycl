import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";

type QuizType = "NONE" | "일반" | "워크시트";

export type QuizSubject = "국어" | "수학";
type AnswerType = "단답형" | "객관식";

export const quizSubjectList = ["국어", "수학"];

export const answerTypetList = ["단답형", "객관식"];

export interface Quiz {
  title: string;
  type: QuizType;
  subject: QuizSubject;
  year: number; // 1 ~ 12
  tag: string;
  difficulty: number; // 1 ~ 10;
  answerType: AnswerType;
  shortAnswerQuestionInfo: ShortAnswerQuestionInfo | null;
  hint: string;

  // for local
  image: File | null;
  imageName: string;
  imageUrl: string;
}

export const initNewQuiz: Quiz = {
  title: "",
  type: "NONE",
  subject: "국어",
  year: 1,
  tag: "",
  difficulty: 1,
  answerType: "단답형",
  shortAnswerQuestionInfo: null,
  hint: "",
  image: null,
  imageName: "",
  imageUrl: ""
};

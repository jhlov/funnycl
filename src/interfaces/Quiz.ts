import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";

type QuizType = "NONE" | "일반" | "워크시트";

export type QuizSubject = "국어" | "수학" | "사회" | "영어";
type AnswerType = "단답형" | "객관식";

export const quizSubjectList = ["국어", "수학", "사회", "영어"];

export const answerTypetList = ["단답형", "객관식"];

export interface Quiz {
  title: string;
  type: QuizType;
  subject: QuizSubject;
  year: number; // 1 ~ 12
  keyword: string; // 제시어
  tag: string;
  difficulty: number; // 1 ~ 10;
  answerType: AnswerType;
  shortAnswerQuestionInfo: ShortAnswerQuestionInfo | null;
  hint: string;
  score: number;

  // for local
  image: File | string | null;
  imageUrl?: string;

  // for server
  id?: string;
  created?: string;
  modified?: string;
  deleted?: string;

  // 게임 플레이 시 세팅
  finished?: boolean;
}

export const initNewQuiz: Quiz = {
  title: "",
  type: "NONE",
  subject: "국어",
  year: 1,
  keyword: "",
  tag: "",
  difficulty: 1,
  answerType: "단답형",
  shortAnswerQuestionInfo: null,
  hint: "",
  score: 10,
  image: null,
  imageUrl: ""
};

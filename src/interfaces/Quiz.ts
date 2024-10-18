import { ShortAnswerQuestionInfo } from "interfaces/ShortAnswerQustionInfo";
import { MultipleChoiceInfo } from "./MultipleChoiceInfo";

export type QuizType = "NONE" | "일반" | "워크시트";

export type QuizSubject = "국어" | "수학" | "사회" | "영어" | "스마일투어";
export type AnswerType = "단답형" | "객관식" | "OX";

export const quizSubjectList = ["국어", "수학", "사회", "영어", "스마일투어"];

export const answerTypetList = ["단답형", "객관식", "OX"];

export interface Quiz {
  title: string;
  type: QuizType;
  content: string; // 일반 문제에서 문제 내용
  subject: QuizSubject;
  year: number; // 1 ~ 12
  keyword: string; // 제시어
  tag: string;
  difficulty: number; // 1 ~ 10;
  answerType: AnswerType;
  shortAnswerQuestionInfo: ShortAnswerQuestionInfo | null;
  multipleChoiceInfo: MultipleChoiceInfo | null;
  oxAnswer: boolean;
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
  content: "",
  subject: "국어",
  year: 1,
  keyword: "",
  tag: "",
  difficulty: 1,
  answerType: "단답형",
  shortAnswerQuestionInfo: null,
  multipleChoiceInfo: null,
  oxAnswer: true,
  hint: "",
  score: 10,
  image: null,
  imageUrl: ""
};

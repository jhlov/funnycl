type QuizType = "NONE" | "NORMAL" | "WORK_SHEET";

export interface Quiz {
  type: QuizType;
  name: string;
}

export const initNewQuiz: Quiz = {
  type: "NONE",
  name: ""
};

export interface MultipleChoiceInfo {
  random: boolean;
  count: number; // 문항수
  rightAnswer?: number;
  answerStringList?: string[];
  answerList?: { x: number; y: number; answer: string }[];
}

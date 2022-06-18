export interface Quiz {
  question: string;
  answer: string;
  example?: string[];
  score: number;
  bonus: boolean;
}

export interface Group {
  name: string;
  score: number;
}

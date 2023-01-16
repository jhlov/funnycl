import { QuizSubject } from "./Quiz";

type GameType = "NONE" | "숨겨진그림";

export interface Game {
  title: string;
  type: GameType;
  sizeX: number;
  sizeY: number;
  groupCount: number;

  isPlaySetting: boolean; // 게임 플레이 시에 세팅
  subject: "랜덤" | QuizSubject;
  yearStart: number;
  yearEnd: number;
  difficultyStart: number;
  difficultyEnd: number;
}

export const initNewGame: Game = {
  title: "",
  type: "NONE",
  sizeX: 4,
  sizeY: 4,
  groupCount: 3,
  isPlaySetting: true,
  subject: "랜덤",
  yearStart: 1,
  yearEnd: 12,
  difficultyStart: 1,
  difficultyEnd: 10
};

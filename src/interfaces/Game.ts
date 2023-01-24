import { QuizSubject } from "./Quiz";

type GameType = "NONE" | "숨겨진그림";

export interface Game {
  title: string;
  type: GameType;
  hiddenPictureAnswer?: string; // 숨겨진 그림일 때, 그림 정답
  sizeX: number;
  sizeY: number;
  groupCount: number;

  isPlaySetting: boolean; // 게임 플레이 시에 세팅
  subject: "랜덤" | QuizSubject;
  yearStart: number;
  yearEnd: number;
  difficultyStart: number;
  difficultyEnd: number;

  // for local
  image: File | string | null;
  imageUrl?: string;

  // for server
  id?: string;
  userId?: string;
  created?: string;
  modified?: string;
  deleted?: string;
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
  difficultyEnd: 10,
  image: null,
  imageUrl: ""
};

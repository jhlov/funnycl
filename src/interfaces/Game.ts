import { CONST } from "const";
import { QuizSubject } from "./Quiz";

type GameType = "NONE" | "숨겨진그림";

export interface Game {
  title: string;
  type: GameType;
  hiddenPictureAnswer?: string; // 숨겨진 그림일 때, 그림 정답
  sizeX: number;
  sizeY: number;
  groupCount: number;
  groupNameList: string[];

  isTurnPlay: boolean;
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
  sizeX: CONST.DEFAULT_BOARD_SIZE_X,
  sizeY: CONST.DEFAULT_BOARD_SIZE_Y,
  groupCount: CONST.DEFAULT_GROUP_COUNT,
  groupNameList: CONST.DEFAULT_GROUP_NAME_LIST,
  isTurnPlay: true,
  subject: "랜덤",
  yearStart: 1,
  yearEnd: 12,
  difficultyStart: 1,
  difficultyEnd: CONST.DIFFICULTY_END,
  image: null,
  imageUrl: ""
};

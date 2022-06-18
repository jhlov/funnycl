import { createSlice } from "@reduxjs/toolkit";
import { Group, Quiz } from "types";

interface InitialState {
  quizList: Quiz[];
  groupList: Group[];
}

const initialState: InitialState = {
  quizList: [
    {
      question:
        "제주도는 삼다도라고 불리기도 하는데 삼다에 해당하지 않는 것은 무엇일까요?",
      answer: "말",
      example: ["여자", "바람", "돌", "말"],
      score: 10,
      bonus: false
    },
    {
      question:
        "소음 측정단위는 데시벨이라고 하는데 기호로는 어떻게 표시하나요?",
      answer: "dB",
      example: ["dA", "aB", "dD", "dB"],
      score: 10,
      bonus: false
    },
    {
      question: "국보1호였던 문화재의 이름은?",
      answer: "숭례문",
      score: 10,
      bonus: false
    },
    {
      question: "오스트레일리아(호주)의 수도는?",
      answer: "캔버라",
      score: 10,
      bonus: false
    },
    {
      question: "우리나라 최초의 한글 소설로 전해지는 고전소설의 이름은?",
      answer: "홍길동전",
      example: ["홍길동전", "구운몽", "장화홍련전", "춘향가"],
      score: 10,
      bonus: false
    },
    {
      question:
        "뮤지컬, 연극, 오페라, 음악회 등의 공연이 끝난 후에 관객이 박수를 보내 배우들을 다시 무대로 나오게 하는 걸 뭐라고할까요?",
      answer: "커튼콜",
      score: 10,
      bonus: false
    },
    {
      question: "불로장생을 꿈꿔 전 세계를 뒤져 불로초를 찾았던 왕의 이름은?",
      answer: "진시황",
      score: 10,
      bonus: false
    },
    {
      question: "덧셈·뺄셈·곱셈·나눗셈의 네 종류의 계산법을 뭐라고 하는가?",
      answer: "사칙연산",
      score: 10,
      bonus: false
    },
    {
      question: "이탈리아의 수도는?",
      answer: "로마",
      example: ["로마", "파리", "런던", "마드리드"],
      score: 10,
      bonus: false
    },
    {
      question: "둘 사이의 다툼에서 제 3자가 이득을 본다는 뜻의 사자성어는?",
      answer: "어부지리",
      example: ["어부지리", "과유불급", "이구동성", "다다익선"],
      score: 10,
      bonus: false
    },
    {
      question: "ㅇㅇ보고 놀란 가슴 솥뚜껑 보고 놀란다",
      answer: "자라",
      score: 10,
      bonus: false
    },
    {
      question: "신발을 세는 단위는?",
      answer: "켤레",
      score: 10,
      bonus: false
    },
    {
      question: "5월 5일 어린이날을 만든 인물은?",
      answer: "방정환",
      score: 10,
      bonus: false
    },
    {
      question: "우리 몸에 꼭 필요한 3대 영양소가 아닌것은?",
      answer: "비타민",
      example: ["탄수화물", "지방", "단백질", "비타민"],
      score: 10,
      bonus: false
    },
    {
      question:
        "개구리가 겨울잠에서 깨는 시기라고도 불리며 24절기 중 세번째인 이 절기는 무엇일까요?",
      answer: "경칩",
      example: ["경칩", "입춘", "하지", "소설"],
      score: 10,
      bonus: false
    },
    {
      question:
        "세계에서 가장 큰 뱀으로 주로 아마존강 유역에 분포되어 있는 이 동물의 이름은?",
      answer: "아나콘다",
      score: 10,
      bonus: false
    },
    {
      question: "전화기에 있는 숫자를 모두 곱하면?",
      answer: "0",
      score: 10,
      bonus: false
    },
    {
      question: "이스라엘의 수도는?",
      answer: "예루살렘",
      score: 10,
      bonus: false
    },
    {
      question: "본초자오선의 기준인 그리니치천문대는 어느 나라에 있을까요?",
      answer: "영국",
      example: ["영국", "미국", "중국", "대한민국"],
      score: 10,
      bonus: false
    },
    {
      question: "바이올린의 현(줄)은 몇개로 되어있을까요?",
      answer: "4",
      example: ["3", "4", "5", "6"],
      score: 10,
      bonus: false
    }
  ],
  groupList: [
    {
      name: "A",
      score: 0,
      color: "red"
    },
    {
      name: "B",
      score: 0,
      color: "blue"
    },
    {
      name: "C",
      score: 0,
      color: "green"
    }
  ]
};

function shuffle(array: any[]) {
  array.sort(() => Math.random() - 0.5);
}

export const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    init: state => {
      const quizList = state.quizList;
      shuffle(quizList);
      for (let i = 0; i < 3; ++i) {
        quizList[i].score = 20;
      }

      shuffle(quizList);
      for (let i = 0; i < 3; ++i) {
        quizList[i].bonus = true;
      }

      shuffle(quizList);
      state.quizList = quizList.slice(0, 16);
    }
  }
});

// Action creators are generated for each case reducer function
export const { init } = game.actions;

export default game.reducer;

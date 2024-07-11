/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import CryptoJS from "crypto-js";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  answerIndex: null,
  isCorrect: null,
  points: 0,
  questionTimer: 12,
  totalTimePlayed: 0,
  pause: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "game",
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      let pointsWon = 0;
      if (question.difficulty == "more") {
        pointsWon = 20;
      } else if (question.difficulty == "less") {
        pointsWon = 10;
      }

      const aesKey = import.meta.env.VITE_AES_KEY;
      const fixedIV = import.meta.env.VITE_IV_KEY;

      const encryptValue = (value) => {
        const key = CryptoJS.enc.Utf8.parse(aesKey);
        const iv = CryptoJS.enc.Utf8.parse(fixedIV);

        const encryptedUserAnswer = CryptoJS.AES.encrypt(value, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
        }).toString();

        return encryptedUserAnswer;
      };

      const checkIsCorrect =
        encryptValue(action.payload) === question.correct_answer;

      return {
        ...state,
        pause: true,
        answer: action.payload,
        points: checkIsCorrect ? state.points + pointsWon : state.points,
        isCorrect: checkIsCorrect ? true : false,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        pause: false,
        index: state.index + 1,
        answer: null,
        isCorrect: null,
        questionTimer: initialState.questionTimer,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...initialState,
      };
    case "tick":
      return {
        ...state,
        questionTimer:
          state.questionTimer !== 0.0 && state.pause !== true
            ? parseFloat((state.questionTimer - 0.1).toFixed(1))
            : state.questionTimer,
        totalTimePlayed:
          state.questionTimer !== 0 && state.pause !== true
            ? parseFloat((state.totalTimePlayed + 0.1).toFixed(1))
            : state.totalTimePlayed,
      };
    case "info":
      return {
        ...state,
        status: "info",
      };
    case "leaderboard":
      return {
        ...state,
        status: "leaderboard",
      };
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      isCorrect,
      points,
      questionTimer,
      totalTimePlayed,
      pause,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;
  const maxPoints = questions.reduce((points, question) => {
    if (question.difficulty === "less") {
      return points + 10;
    } else if (question.difficulty === "more") {
      return points + 20;
    }
    return points; // return sum unchanged if difficulty is neither 'less' nor 'more'
  }, 0);

  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      if (shouldRefetch) {
        fetch(import.meta.env.VITE_API_URL)
          .then((res) => res.json())
          .then((data) => dispatch({ type: "dataReceived", payload: data }))
          // eslint-disable-next-line no-unused-vars
          .catch((err) => {
            dispatch({ type: "dataFailed" });
            setError(err); // Set error state
          })
          .finally(() => setShouldRefetch(false));
      }
    },
    [shouldRefetch]
  );

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        isCorrect,
        points,
        pause,
        questionTimer,
        totalTimePlayed,
        numberOfQuestions,
        maxPoints,
        setShouldRefetch,
        error,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };

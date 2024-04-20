/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  questionTimer: 6,
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
      return {
        ...state,
        pause: true,
        answer: action.payload,
        points:
          action.payload === question.correct_answer
            ? state.points + pointsWon
            : state.points,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        pause: false,
        index: state.index + 1,
        answer: null,
        questionTimer: initialState.questionTimer,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        questionTimer:
          state.questionTimer !== 0 && state.pause !== true
            ? state.questionTimer - 1
            : state.questionTimer,
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
      points,
      highscore,
      questionTimer,
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
  useEffect(
    function () {
      if (shouldRefetch) {
        fetch(import.meta.env.VITE_API_URL)
          .then((res) => res.json())
          .then((data) => dispatch({ type: "dataReceived", payload: data }))
          .catch((err) => dispatch({ type: "dataFailed" }))
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
        points,
        highscore,
        pause,
        questionTimer,
        numberOfQuestions,
        maxPoints,
        setShouldRefetch,

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

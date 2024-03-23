import { useEffect, useReducer, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Start from "./components/Start";
import Game from "./components/Game";
import NextQuestionButton from "./components/NextQuestionButton";
import CurrentQuestion from "./components/CurrentQuestion";
import Finish from "./components/Finish";
import Timer from "./components/Timer";

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

function App() {
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [
    { questions, status, index, answer, points, highscore, questionTimer },
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

  useEffect(
    function () {
      if (shouldRefetch) {
        fetch("https://mimkviz.pythonanywhere.com/questions")
          .then((res) => res.json())
          .then((data) => dispatch({ type: "dataReceived", payload: data }))
          .catch((err) => dispatch({ type: "dataFailed" }))
          .finally(() => setShouldRefetch(false));
      }
    },
    [shouldRefetch]
  );

  return (
    <>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start numberOfQuestions={numberOfQuestions} dispatch={dispatch} />
        )}
        {status === "game" && (
          <>
            <CurrentQuestion
              index={index}
              numberOfQuestions={numberOfQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
              dispatch={dispatch}
            />
            <Timer dispatch={dispatch} questionTimer={questionTimer} />
            <Game
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              questionTimer={questionTimer}
            />
            <NextQuestionButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numberOfQuestions={numberOfQuestions}
              questionTimer={questionTimer}
            />
          </>
        )}
        {status === "finished" && (
          <Finish
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
            setShouldRefetch={setShouldRefetch}
          />
        )}
      </Main>
    </>
  );
}

export default App;

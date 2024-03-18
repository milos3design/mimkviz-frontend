import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Start from "./components/Start";
import Game from "./components/Game";
import NextQuestionButton from "./components/NextQuestionButton";
import CurrentQuestion from "./components/CurrentQuestion";
import Finish from "./components/Finish";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
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
      console.log(`qest:${question.correct_answer}`);
      return {
        ...state,
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
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);
  const numberOfQuestions = questions.length;
  const maxPoints = questions.reduce((points, question) => {
    if (question.difficulty === "less") {
      return points + 10;
    } else if (question.difficulty === "more") {
      return points + 20;
    }
    return points; // return sum unchanged if difficulty is neither 'less' nor 'more'
  }, 0);

  useEffect(function () {
    fetch("https://mimkviz.pythonanywhere.com/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  console.log(questions);

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
            />
            <Game
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextQuestionButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numberOfQuestions={numberOfQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <Finish points={points} maxPoints={maxPoints} highscore={highscore} />
        )}
      </Main>
    </>
  );
}

export default App;

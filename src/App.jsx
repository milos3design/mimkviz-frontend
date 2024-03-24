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
import { useQuiz } from "./contexts/QuizContext";

function App() {
  const { status } = useQuiz();
  return (
    <>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Start />}
        {status === "game" && (
          <>
            <CurrentQuestion />
            <Timer />
            <Game />
            <NextQuestionButton />
          </>
        )}
        {status === "finished" && <Finish />}
      </Main>
    </>
  );
}

export default App;

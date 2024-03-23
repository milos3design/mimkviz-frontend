import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Game from "./Game";
import NextQuestionButton from "./NextQuestionButton";
import CurrentQuestion from "./CurrentQuestion";
import Finish from "./Finish";
import Timer from "./Timer";
import { useQuiz } from "../contexts/QuizContext";

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

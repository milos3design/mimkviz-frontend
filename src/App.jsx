import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Start from "./components/Start";
import Game from "./components/Game";
import Finish from "./components/Finish";
import { useQuiz } from "./contexts/QuizContext";
import Info from "./components/Info";

function App() {
  const { status } = useQuiz();
  return (
    <>
      <Main>
        {status === "ready" && <Start />}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "info" && <Info />}
        {status === "game" && <Game />}
        {status === "finished" && <Finish />}
      </Main>
    </>
  );
}

export default App;

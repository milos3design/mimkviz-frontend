import { useQuiz } from "./contexts/QuizContext";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Start from "./components/Start";
import Game from "./components/Game";
import Finish from "./components/Finish";
import Info from "./components/Info";
import LeaderboardPage from "./components/LeaderboardPage";

function App() {
  const { status } = useQuiz();
  return (
    <>
      <Main>
        {status === "ready" && <Start />}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "info" && <Info />}
        {status === "leaderboard" && <LeaderboardPage />}
        {status === "game" && <Game />}
        {status === "finished" && <Finish />}
      </Main>
    </>
  );
}

export default App;

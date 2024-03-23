import { useQuiz } from "../contexts/QuizContext";

function Finish() {
  const { points, maxPoints, highscore, dispatch, setShouldRefetch } =
    useQuiz();
  return (
    <div>
      Osvojeno poena: {points} od maksimalnih {maxPoints}
      <p>Najveci rezultat: {highscore}</p>
      <button
        onClick={() => {
          dispatch({ type: "restart" });
          setShouldRefetch(true);
        }}
      >
        Početni ekran
      </button>
    </div>
  );
}

export default Finish;

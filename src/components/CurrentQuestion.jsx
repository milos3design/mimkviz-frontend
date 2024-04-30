import { useQuiz } from "../contexts/QuizContext";
import Timer from "./Timer";

function CurrentQuestion() {
  const { index, numberOfQuestions, points, maxPoints, answer } = useQuiz();
  return (
    <header>
      <progress
        max={numberOfQuestions}
        value={index + Number(answer !== null)}
      />
      <p>
        Pitanje {index + 1} od {numberOfQuestions}
      </p>
      <p>
        Poena: {points} / {maxPoints}{" "}
      </p>
      <p>
        Vreme: <Timer />
      </p>
    </header>
  );
}

export default CurrentQuestion;

import { useQuiz } from "../contexts/QuizContext";

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
      <p>Vreme:</p>
    </header>
  );
}

export default CurrentQuestion;

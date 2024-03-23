import { useQuiz } from "../contexts/QuizContext";

function NextQuestionButton() {
  const { dispatch, answer, index, numberOfQuestions, questionTimer } =
    useQuiz();
  const isLastQuestion = index === numberOfQuestions - 1;

  if (answer === null && questionTimer !== 0) {
    return null;
  }

  return (
    <button
      onClick={() =>
        dispatch({ type: isLastQuestion ? "finish" : "nextQuestion" })
      }
    >
      {isLastQuestion ? "Kraj" : "Sledeće"}
    </button>
  );
}

export default NextQuestionButton;

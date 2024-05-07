import { useQuiz } from "../contexts/QuizContext";
import styles from "./NextQuestionButton.module.css";

function NextQuestionButton() {
  const { dispatch, answer, index, numberOfQuestions, questionTimer } =
    useQuiz();
  const isLastQuestion = index === numberOfQuestions - 1;

  if (answer === null && questionTimer !== 0) {
    return null;
  }

  return (
    <div className={styles.nextContainer}>
      <button
        className={styles.nextButton}
        onClick={() =>
          dispatch({ type: isLastQuestion ? "finish" : "nextQuestion" })
        }
      >
        {isLastQuestion ? "Kraj" : "Sledeće"}
        <div className={styles.arrowIconCircle}>
          <img className={styles.arrowIcon} src="/arrow.svg" alt="arrow" />
        </div>
      </button>
    </div>
  );
}

export default NextQuestionButton;

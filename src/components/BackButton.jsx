import { useQuiz } from "../contexts/QuizContext";
import styles from "./BackButton.module.css";

function NextQuestionButton() {
  const { dispatch, setShouldRefetch } = useQuiz();

  return (
    <div className={styles.backContainer}>
      <button
        className={styles.backButton}
        onClick={() => {
          dispatch({ type: "restart" });
          setShouldRefetch(true);
        }}
      >
        <div className={styles.arrowIconCircle}>
          <img className={styles.arrowBackIcon} src="/arrow.svg" alt="arrow" />
        </div>
        Povratak
      </button>
    </div>
  );
}

export default NextQuestionButton;

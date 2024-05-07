import { useQuiz } from "../contexts/QuizContext";
import styles from "./StartButton.module.css";

function StartButton() {
  const { dispatch } = useQuiz();
  return (
    <div className={styles.buttonContainer}>
      <button
        className={styles.bigButton}
        onClick={() => dispatch({ type: "start" })}
      >
        ZAPOČNI KVIZ
        <div className={styles.arrowIconCircle}>
          <img className={styles.arrowIcon} src="/arrow.svg" alt="arrow" />
        </div>
      </button>
    </div>
  );
}

export default StartButton;

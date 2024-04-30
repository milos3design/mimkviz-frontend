import { useEffect, useRef } from "react";
import { useQuiz } from "../contexts/QuizContext";
import styles from "./Timer.module.css";

function Timer() {
  const { dispatch, questionTimer, status, answer } = useQuiz();
  const initialQuestionTimer = useRef(questionTimer);

  useEffect(() => {
    const id = setInterval(() => {
      if (questionTimer > 0 && status === "game" && answer === null) {
        dispatch({ type: "tick" });
      }
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch, questionTimer, status, answer]);

  const progress =
    ((initialQuestionTimer.current - questionTimer) /
      initialQuestionTimer.current) *
    100;
  console.log(progress);

  return (
    <div className={styles.timerContainer}>
      <div
        className={styles.progress}
        style={{
          backgroundImage: `conic-gradient(var(--color-brand-red) ${progress}%, transparent ${progress}%)`,
        }}
      >
        <div className={styles.hole}></div>
        <div className={styles.hole}>{questionTimer}</div>
      </div>
    </div>
  );
}

export default Timer;

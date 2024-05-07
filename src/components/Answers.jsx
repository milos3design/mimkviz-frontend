import { useQuiz } from "../contexts/QuizContext";
import styles from "./Answers.module.css";

function Answers({ question }) {
  const { dispatch, answer, questionTimer, isCorrect } = useQuiz();
  if (questionTimer === 0) () => dispatch({ type: "newAnswer", payload: null });

  return (
    <div className={styles.answerBox}>
      {question.possible_answers.map((answerItem, index) => (
        <button
          key={index}
          disabled={answer !== null || questionTimer === 0}
          onClick={() => dispatch({ type: "newAnswer", payload: answerItem })}
          className={`${styles.answerButton} ${
            answer === answerItem && questionTimer > 0
              ? isCorrect
                ? styles.correct
                : styles.wrong
              : answer !== null || questionTimer === 0
              ? styles.inactive
              : ""
          }`}
        >
          {answerItem}
        </button>
      ))}
    </div>
  );
}

export default Answers;

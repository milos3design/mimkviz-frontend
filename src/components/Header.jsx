import { useQuiz } from "../contexts/QuizContext";
import styles from "./Header.module.css";
import Timer from "./Timer";

function Header() {
  const { index, numberOfQuestions, points, maxPoints } = useQuiz();
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src="/mimkvizlogo.png" alt="Mimkviz logo" />
      </div>
      <div className={styles.stats}>
        <div className={styles.question}>
          <div className={styles.title}>Pitanje:</div>
          <div className={styles.statText}>
            {index + 1}{" "}
            <span className={styles.title}>/ {numberOfQuestions}</span>
          </div>
        </div>
        <div className={styles.points}>
          <div className={styles.title}>Poena:</div>
          <div className={styles.statText}>
            {points} <span className={styles.title}>/ {maxPoints}</span>
          </div>
        </div>
        <div className={styles.timer}>
          <Timer />
        </div>
      </div>
    </header>
  );
}

export default Header;

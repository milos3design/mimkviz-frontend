import { useQuiz } from "../contexts/QuizContext";
import styles from "./Start.module.css";
import Image from "./Image";
import StartButton from "./StartButton";
import Footer from "./Footer";

function Start() {
  const { numberOfQuestions } = useQuiz();
  return (
    <div className={styles.startContainer}>
      <div className={styles.startScreen}>
        <div className={styles.startScreenContent}>
          <div className={styles.imageLeft}>
            <Image />
          </div>
          <div className={styles.centerContent}>
            <img src="/mimkvizlogo.png" alt="Mimkviz logo" />
            <h2>Koliko dobro poznaješ (video) mimove?</h2>
            <p>{numberOfQuestions} pitanja da testiraš svoje znanje.</p>
          </div>
          <div className={styles.imageRight}>
            <Image />
          </div>
        </div>
        <StartButton />
      </div>
      <Footer height="20%" />
    </div>
  );
}

export default Start;

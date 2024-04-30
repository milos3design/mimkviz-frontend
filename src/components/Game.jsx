import { useQuiz } from "../contexts/QuizContext";
import styles from "./Game.module.css";
import Answers from "./Answers";
import Header from "./Header";
import NextQuestionButton from "./NextQuestionButton";

function Game() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);
  return (
    <div className={styles.gameContainer}>
      <Header />
      <div className={styles.mainbox}>
        <h2>{question.question}</h2>
        <Answers question={question} />
        <NextQuestionButton />
      </div>
    </div>
  );
}

export default Game;

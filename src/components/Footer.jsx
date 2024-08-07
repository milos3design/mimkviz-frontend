import { useQuiz } from "../contexts/QuizContext";
import styles from "./Footer.module.css";

function Footer() {
  const { dispatch } = useQuiz();

  return (
    <footer className={styles.footer}>
      <p>
        <a onClick={() => dispatch({ type: "info" })}>Info</a> |
        <a onClick={() => dispatch({ type: "leaderboard" })}> Top Lista</a> | by{" "}
        <a href="https://www.milos3design.com">shommy</a>
      </p>
    </footer>
  );
}

export default Footer;

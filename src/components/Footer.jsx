import { useQuiz } from "../contexts/QuizContext";
import styles from "./Footer.module.css";

function Footer({ height }) {
  const { dispatch } = useQuiz();
  const footerStyle = {
    height: height,
  };
  return (
    <footer className={styles.footer} style={footerStyle}>
      <p>
        <a onClick={() => dispatch({ type: "info" })}>info</a> | by{" "}
        <a href="https://www.milos3design.com">shommy</a>
      </p>
    </footer>
  );
}

export default Footer;

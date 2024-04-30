import { useQuiz } from "../contexts/QuizContext";
import Image from "./Image";
import styles from "./Error.module.css";

function Error() {
  const { error } = useQuiz();

  return (
    <div className={styles.error}>
      <Image />
      <p>Greška u programu.</p>
      <p>({error.message})</p>
    </div>
  );
}

export default Error;

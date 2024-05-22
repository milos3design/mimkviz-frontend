import { useQuiz } from "../contexts/QuizContext";
import BackButton from "./BackButton";
import styles from "./Finish.module.css";

function Finish() {
  const { questions, points, maxPoints } = useQuiz();

  function getYouTubeVideoID(url) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  }

  return (
    <div className={styles.finishContainer}>
      <BackButton />
      <p> Osvojeno poena: </p>
      <h2>{points}</h2>
      <p>od maksimalnih {maxPoints}</p>
      <div className={styles.videoGrid}>
        {questions.map((question) => (
          <div key={question.id} className={styles.videoContainer}>
            <h4>{question.question}</h4>
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoID(
                question.url
              )}`}
              allowFullScreen
              title={`Video ${question.id}`}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Finish;

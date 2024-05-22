import { useEffect, useState } from "react";
import { useQuiz } from "../contexts/QuizContext";
import BackButton from "./BackButton";
import styles from "./Finish.module.css";

function Finish() {
  let time = 5;
  const { questions, points, maxPoints } = useQuiz();
  const [highscores, setHighscores] = useState([]);
  const [name, setName] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const fetchHighscores = () => {
    fetch(import.meta.env.VITE_LB_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setHighscores(data);
      })
      .catch((error) => {
        console.error("Error fetching highscores:", error);
      });
  };

  const checkHighscore = () => {
    if (highscores.length < 10) return true;

    const lowestHighscore = highscores[highscores.length - 1];
    return (
      points > lowestHighscore.points ||
      (points === lowestHighscore.points && time < lowestHighscore.time)
    );
  };

  const submitScore = async (e) => {
    e.preventDefault();
    if (checkHighscore() && !hasSubmitted) {
      try {
        setHasSubmitted(true);
        const response = await fetch(import.meta.env.VITE_LB_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, points, time }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }
        fetchHighscores();
      } catch (error) {
        console.error("Error submitting score:", error);
        setHasSubmitted(false);
      }
    }
  };

  useEffect(() => {
    fetchHighscores();
  }, []);

  // function getYouTubeVideoID(url) {
  //   const regex =
  //     /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  //   const matches = url.match(regex);
  //   return matches ? matches[1] : null;
  // }

  return (
    <div className={styles.finishContainer}>
      <BackButton />
      <p> Osvojeno poena: </p>
      <h2>{points}</h2>
      <p>od maksimalnih {maxPoints}</p>

      <div>
        {checkHighscore() && !hasSubmitted && (
          <form onSubmit={submitScore}>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={hasSubmitted}
            />
            <button disabled={hasSubmitted}>
              {hasSubmitted ? "Score Submitted" : "Submit Highscore"}
            </button>
          </form>
        )}
      </div>

      <div className={styles.leaderboard}>
        <h3>Leaderboard</h3>
        <div className={styles.leaderboardGrid}>
          <div className={styles.leaderboardHeader}>
            <div>Name</div>
            <div>Points</div>
            <div>Time</div>
          </div>
          {highscores.map((score, index) => (
            <div key={index} className={styles.leaderboardRow}>
              <div>{score.name}</div>
              <div>{score.points}</div>
              <div>{score.time}</div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className={styles.videoGrid}>
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
      </div> */}
    </div>
  );
}

export default Finish;

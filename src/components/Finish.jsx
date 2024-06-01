import { useEffect, useState } from "react";
import { useQuiz } from "../contexts/QuizContext";
import { fetchHighscores as fetchHighscoresUtil } from "../utils/highscoreUtils";
import { getCookie } from "../utils/csrf";
import BackButton from "./BackButton";
import Leaderboard from "./Leaderboard";
import useHighscores from "../hooks/useHighscores";
import styles from "./Finish.module.css";

function Finish() {
  const { questions, points, totalTimePlayed } = useQuiz();
  const { highscores, setHighscores } = useHighscores();
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const recordGameCompletion = async () => {
      try {
        const csrfToken = getCookie("csrftoken");
        const response = await fetch(import.meta.env.VITE_COUNT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response error: ${errorText}`);
        }
      } catch (error) {
        console.error("Error recording game completion:", error);
      }
    };

    recordGameCompletion();
  }, []);

  const checkHighscore = () => {
    // Check if the new score is better than any of the existing scores
    for (let i = 0; i < highscores.length; i++) {
      const existingScore = highscores[i];
      if (
        points > existingScore.points ||
        (points === existingScore.points &&
          totalTimePlayed <= existingScore.time)
      ) {
        return true;
      }
    }
    return false;
  };

  const submitScore = async (e) => {
    e.preventDefault();
    let time = Math.round(parseFloat(totalTimePlayed) * 10) / 10;
    if (name.trim() !== "" && name.length <= 16) {
      if (checkHighscore() && !hasSubmitted) {
        try {
          setHasSubmitted(true);
          const csrfToken = getCookie("csrftoken");
          const response = await fetch(import.meta.env.VITE_LB_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
            },
            credentials: "include", // Ensure cookies are sent with the request
            body: JSON.stringify({ name, points, time }),
          });
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Greška u mrežnom odgovoru: ${errorText}`);
          }
          const data = await fetchHighscoresUtil();
          setHighscores(data);
        } catch (error) {
          console.error("Greška u preuzimanju top liste:", error);
          setHasSubmitted(false);
        }
      }
    } else {
      setShowAlert(true);
    }
  };

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

      <div className={styles.highScore}>
        {checkHighscore() && !hasSubmitted && (
          <div>
            <h3>Osvojen je TOP 10 rezultat!!!</h3>
            <form onSubmit={submitScore} className={styles.inputForm}>
              <input
                type="text"
                placeholder="Upiši svoje ime ovde!"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={hasSubmitted}
                className={styles.input}
              />
              <button disabled={hasSubmitted} className={styles.button}>
                Upiši se!
              </button>
            </form>
            {showAlert && (
              <div className={styles.alert}>
                <p>Ime mora da ima između 1 i 16 karaktera!</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Leaderboard highscores={highscores} />
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

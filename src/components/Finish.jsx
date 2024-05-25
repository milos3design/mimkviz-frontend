import { useEffect, useState } from "react";
import { useQuiz } from "../contexts/QuizContext";
import BackButton from "./BackButton";
import styles from "./Finish.module.css";

function Finish() {
  let time = 5;
  const { questions, points } = useQuiz();
  const [highscores, setHighscores] = useState([]);
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const fetchHighscores = () => {
    fetch(import.meta.env.VITE_LB_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Greška u mrežnom odgovoru");
        }
        return response.json();
      })
      .then((data) => {
        setHighscores(data);
      })
      .catch((error) => {
        console.error("Greška u preuzimanju top liste:", error);
      });
  };

  const checkHighscore = () => {
    // Check if the new score is better than any of the existing scores
    for (let i = 0; i < highscores.length; i++) {
      const existingScore = highscores[i];
      if (
        points > existingScore.points ||
        (points === existingScore.points && time <= existingScore.time)
      ) {
        return true;
      }
    }
    return false;
  };

  const submitScore = async (e) => {
    e.preventDefault();

    if (name.trim() !== "" && name.length <= 16) {
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
            throw new Error(`Greška u mrežnom odgovoru: ${errorText}`);
          }
          fetchHighscores();
        } catch (error) {
          console.error("Greška u preuzimanju top liste:", error);
          setHasSubmitted(false);
        }
      }
    } else {
      setShowAlert(true);
    }
  };
  useEffect(() => {
    fetchHighscores();
  }, []);

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

      <div className={styles.leaderboard}>
        <h3>Top Lista</h3>
        <div className={styles.leaderboardGrid}>
          <div className={styles.leaderboardHeader}>
            <div>Ime</div>
            <div>Poena</div>
            <div>Vreme</div>
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

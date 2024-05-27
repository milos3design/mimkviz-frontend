import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import Leaderboard from "./Leaderboard";
import { fetchHighscores as fetchHighscoresUtil } from "../utils/highscoreUtils";
import styles from "./LeaderboardPage.module.css";

function LeaderboardPage() {
  const [highscores, setHighscores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHighscoresUtil();
        setHighscores(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <BackButton />
      {error ? (
        <div className={styles.error}>Error: {error}</div>
      ) : (
        <Leaderboard highscores={highscores} />
      )}
    </div>
  );
}

export default LeaderboardPage;

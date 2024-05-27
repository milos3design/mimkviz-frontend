import styles from "./Leaderboard.module.css";

function Leaderboard({ highscores = [] }) {
  return (
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
  );
}

export default Leaderboard;

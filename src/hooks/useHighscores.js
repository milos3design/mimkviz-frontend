import { useState, useEffect } from "react";
import { fetchHighscores as fetchHighscoresUtil } from "../utils/highscoreUtils";

const useHighscores = () => {
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

  return { highscores, setHighscores, error };
};

export default useHighscores;

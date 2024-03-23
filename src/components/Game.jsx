import { useQuiz } from "../contexts/QuizContext";
import Answers from "./Answers";

function Game() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);
  return (
    <>
      <h2>{question.question}</h2>
      <Answers question={question} />
    </>
  );
}

export default Game;

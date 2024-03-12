import Answers from "./Answers";

function Game({ question, dispatch, answer }) {
  return (
    <>
      <h2>{question.question}</h2>
      <Answers question={question} dispatch={dispatch} answer={answer} />
    </>
  );
}

export default Game;

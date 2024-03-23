import Answers from "./Answers";

function Game({ question, dispatch, answer, questionTimer }) {
  return (
    <>
      <h2>{question.question}</h2>
      <Answers
        question={question}
        dispatch={dispatch}
        answer={answer}
        questionTimer={questionTimer}
      />
    </>
  );
}

export default Game;

function Answers({ question, dispatch, answer }) {
  return (
    <div>
      {question.possible_answers.map((answerItem, index) => (
        <button
          key={index}
          disabled={answer !== null}
          onClick={() => dispatch({ type: "newAnswer", payload: answerItem })}
        >
          {answerItem}
        </button>
      ))}
    </div>
  );
}

export default Answers;

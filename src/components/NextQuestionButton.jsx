function NextQuestionButton({ dispatch, answer }) {
  if (answer === null) {
    return null;
  }
  return (
    <button onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
  );
}

export default NextQuestionButton;

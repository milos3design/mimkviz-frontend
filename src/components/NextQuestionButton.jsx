function NextQuestionButton({ dispatch, answer, index, numberOfQuestions }) {
  if (answer === null) {
    return null;
  }
  if (index < numberOfQuestions - 1)
    return (
      <button onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
    );
  if (index === numberOfQuestions - 1)
    return <button onClick={() => dispatch({ type: "finish" })}>Finish</button>;
}

export default NextQuestionButton;

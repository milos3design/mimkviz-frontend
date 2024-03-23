function NextQuestionButton({
  dispatch,
  answer,
  index,
  numberOfQuestions,
  questionTimer,
}) {
  if (answer === null && questionTimer !== 0) {
    return null;
  }

  if (index < numberOfQuestions - 1)
    return (
      <button onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
    );

  if (index === numberOfQuestions - 1)
    return <button onClick={() => dispatch({ type: "finish" })}>Finish</button>;

  if (answer === null && questionTimer === 0 && index < numberOfQuestions - 1)
    return (
      <button onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
    );

  if (answer === null && questionTimer === 0 && index === numberOfQuestions - 1)
    return <button onClick={() => dispatch({ type: "finish" })}>Finish</button>;
}

export default NextQuestionButton;

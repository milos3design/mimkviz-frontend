function Start({ numberOfQuestions, dispatch }) {
  return (
    <div>
      <h2>Welcome</h2>
      <h3>{numberOfQuestions} questions to test your knowl..</h3>
      <button onClick={() => dispatch({ type: "start" })}>
        Let&apos;s START
      </button>
    </div>
  );
}

export default Start;

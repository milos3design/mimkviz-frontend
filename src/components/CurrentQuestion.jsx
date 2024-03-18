function CurrentQuestion({
  index,
  numberOfQuestions,
  points,
  maxPoints,
  answer,
}) {
  return (
    <header>
      <progress
        max={numberOfQuestions}
        value={index + Number(answer !== null)}
      />
      <p>
        Pitanje {index + 1} od {numberOfQuestions}
      </p>
      <p>
        Poena: {points} / {maxPoints}{" "}
      </p>
    </header>
  );
}

export default CurrentQuestion;

function CurrentQuestion({ index, numberOfQuestions, points, maxPoints }) {
  return (
    <header>
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

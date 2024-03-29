import { useQuiz } from "../contexts/QuizContext";

function Answers({ question }) {
  const { dispatch, answer, questionTimer } = useQuiz();
  if (questionTimer === 0) () => dispatch({ type: "newAnswer", payload: null });

  return (
    <div>
      {question.possible_answers.map((answerItem, index) => (
        <button
          key={index}
          disabled={answer !== null || questionTimer === 0}
          onClick={() => dispatch({ type: "newAnswer", payload: answerItem })}
        >
          {answerItem}
        </button>
      ))}
    </div>
  );
}

export default Answers;

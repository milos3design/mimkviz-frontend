import { useQuiz } from "../contexts/QuizContext";

function Start() {
  const { numberOfQuestions, dispatch } = useQuiz();
  return (
    <div>
      <h2>Welcome</h2>
      <h3>{numberOfQuestions} questions to test your knowl..</h3>
      <button onClick={() => dispatch({ type: "start" })}>Započni</button>
    </div>
  );
}

export default Start;

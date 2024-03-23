function Finish({ points, maxPoints, highscore, dispatch, setShouldRefetch }) {
  return (
    <div>
      Osvojeno poena: {points} od maksimalnih {maxPoints}
      <p>Najveci rezultat: {highscore}</p>
      <button
        onClick={() => {
          dispatch({ type: "restart" });
          setShouldRefetch(true);
        }}
      >
        Početni ekran
      </button>
    </div>
  );
}

export default Finish;

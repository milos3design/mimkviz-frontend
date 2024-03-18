function Finish({ points, maxPoints, highscore }) {
  return (
    <div>
      Osvojeno poena: {points} od maksimalnih {maxPoints}
      <p>Najveci rezultat: {highscore}</p>
    </div>
  );
}

export default Finish;

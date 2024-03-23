import { useEffect } from "react";

function Timer({ dispatch, questionTimer }) {
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return <div>{questionTimer}</div>;
}

export default Timer;

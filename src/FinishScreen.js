function FinishScreen({ points, questionPoints, highScore, dispatch }) {
  const percentage = (points / questionPoints) * 100;
  console.log(points, percentage);
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage < 100 && percentage >= 80) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage > 0 && percentage < 50) emoji = "😒";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You Scored {points} of {questionPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">( High Score: {highScore} Points )</p>
      <button
        className="btn "
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;

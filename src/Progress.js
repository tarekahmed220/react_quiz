function Progress({ index, numQuestions, answer, questionPoints, points }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p className="points">
        {" "}
        <strong>{points}</strong> / {questionPoints} Points
      </p>
    </header>
  );
}

export default Progress;

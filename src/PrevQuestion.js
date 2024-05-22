function PrevQuestion({ index, dispatch, answer }) {
  if (index < 1 || answer === null) return null;
  return (
    <button
      style={{ position: "absolute" }}
      onClick={() => {
        dispatch({ type: "prevQuestion" });
      }}
      className="btn btn-ui"
    >
      Previous
    </button>
  );
}

export default PrevQuestion;

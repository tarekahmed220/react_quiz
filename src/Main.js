import { useEffect, useReducer } from "react";
import Error from "./components/Error";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Start from "./components/Start";
import NextQuestion from "./components/nextQuestion";
// import PrevQuestion from "./PrevQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

let SECN_PER_QUESTION = 20;
function reducer(state, action) {
  switch (action.type) {
    case "error": {
      return { ...state, status: "faild" };
    }
    case "dataReceived": {
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    }
    case "start": {
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECN_PER_QUESTION,
      };
    }
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }
    case "prevQuestion": {
      return {
        ...state,
        index: state.index - 1,
      };
    }
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.highScore > state.points ? state.highScore : state.points,
      };
    case "restart": {
      return { ...state, status: "ready", index: 0, answer: null, points: 0 };
    }
    case "timer": {
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "ready" : state.status,
      };
    }
    default: {
      throw new Error("action not exist");
    }
  }
}
// status will be one of the following [loading - ready - faild- active - finished]
const intialstate = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondRemaining: 3,
};

function Main() {
  const [
    { highScore, answer, questions, status, index, points, secondRemaining },
    dispatch,
  ] = useReducer(reducer, intialstate);
  const numQuestions = questions.length;
  const questionPoints = questions.reduce((curr, acc) => curr + acc.points, 0);
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(
          "https://tarekahmed550.github.io/world_wise_data/react-quiz.json"
        );
        const data = await response.json();
        dispatch({
          type: "dataReceived",
          payload: data.questions,
        });
      } catch (error) {
        dispatch({ type: "error" });
      }
    }
    fetchQuestions();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {status === "error" && <Error />}
      {status === "loading" && <Loader />}
      {status === "ready" && (
        <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
      )}
      {status === "active" && (
        <>
          <Progress
            numQuestions={numQuestions}
            index={index}
            answer={answer}
            questionPoints={questionPoints}
            points={points}
          />
          <Start
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <div
            style={{
              marginTop: "20px",
              width: "40%",
            }}
          >
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </div>
        </>
      )}
      {status === "finished" && (
        <FinishScreen
          dispatch={dispatch}
          questionPoints={questionPoints}
          numQuestions={numQuestions}
          points={points}
          highScore={highScore}
        />
      )}
    </div>
  );
}

/* <PrevQuestion dispatch={dispatch} answer={answer} index={index} /> */

export default Main;

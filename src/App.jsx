import React, { useReducer } from "react";
import { COLOR_ACTIONS } from "./colortype";
import "./index.css";

const initialState = {
  red: 0,
  green: 0,
  blue: 0,
};

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

const reducer = (state, action) => {
  switch (action.type) {
    case COLOR_ACTIONS.INCREMENT.RED:
      return { ...state, red: clamp(state.red + 1, 0, 255) };
    case COLOR_ACTIONS.INCREMENT.BLUE:
      return { ...state, blue: clamp(state.blue + 1, 0, 255) };
    case COLOR_ACTIONS.INCREMENT.GREEN:
      return { ...state, green: clamp(state.green + 1, 0, 255) };
    case COLOR_ACTIONS.DECREMENT.BLUE:
      return { ...state, blue: clamp(state.blue - 1, 0, 255) };
    case COLOR_ACTIONS.DECREMENT.RED:
      return { ...state, red: clamp(state.red - 1, 0, 255) };
    case COLOR_ACTIONS.DECREMENT.GREEN:
      return { ...state, green: clamp(state.green - 1, 0, 255) };
    default:
      return state;
  }
};

const ButtonComponent = ({ children, dispatch, colorType }) => {
  return (
    <div className="flex justify-between items-center space-x-2 mb-4">
      <p className="text-lg font-semibold">{children}</p>
      <button
        onClick={() => dispatch({ type: COLOR_ACTIONS.INCREMENT[colorType] })}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Increment
      </button>
      <button
        onClick={() => dispatch({ type: COLOR_ACTIONS.DECREMENT[colorType] })}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Decrement
      </button>
    </div>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { red, green, blue } = state;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
        className="w-96 h-96 mb-8"
        style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
      ></div>
      <div className="w-full max-w-md px-8 py-6 bg-white shadow-md rounded-lg">
        <ButtonComponent dispatch={dispatch} colorType="RED">
          Red: {red}
        </ButtonComponent>
        <ButtonComponent dispatch={dispatch} colorType="GREEN">
          Green: {green}
        </ButtonComponent>
        <ButtonComponent dispatch={dispatch} colorType="BLUE">
          Blue: {blue}
        </ButtonComponent>
      </div>
    </div>
  );
}

export default App;

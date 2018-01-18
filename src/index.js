import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

const counter = (state = 0, action) => {
  console.log(state);
  switch (action.type) {
    case "DECREMENT":
      return state - 1;
    case "INCREMENT":
      return state + 1;
    default:
      return state;
  }
}

const store = createStore(counter);

const Counter = ({
  value,
  onIncrement,
  onDecrement
})=> (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)
// Todo class

// Render the app
const render = () => {
  ReactDOM.render(<TodoApp
    todos={store.getState().todos}
  />,
  document.getElementById("root"));
};

store.subscribe(render);
render();

import React from "react";

import {connect} from 'react-redux';
import {addTodo} from '../actions';

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => input = node} />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = "";
      }}>Add todo</button>
    </div>
  );
}
// pass the dispatch to the component and not a state
AddTodo = connect()(AddTodo);


export default AddTodo;

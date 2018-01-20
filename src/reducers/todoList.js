import todoItem from './todoItem';

const todoList = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        todoItem(undefined, action)
      ];
    case "TOGGLE_TODO":
      return state.map(t => todoItem(t, action));
    default:
      return state;
  }
}

export default todoList;

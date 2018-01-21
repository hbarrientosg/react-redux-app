import { combineReducers } from 'redux'
import todoList, * as fromTodos from './todoList';

const todoApp = combineReducers({
  todoList,
});

export default todoApp;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todoList, filter);

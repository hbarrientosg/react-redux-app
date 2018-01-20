import { combineReducers } from 'redux'
import todoList from './todoList';

const todoApp = combineReducers({
  todoList,
});

export default todoApp;

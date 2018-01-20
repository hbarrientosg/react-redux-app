import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TodoList from './todoList';
import {toggleTodo} from '../actions';

const getVisibleTodos = (todoList, filter) => {
  switch (filter) {
    case "all":
      return todoList;
    case "completed":
      return todoList.filter(t => t.completed);
    case "active":
      return todoList.filter(t => !t.completed);
    default:
      return todoList;
  }
}

const mapStateToProps = ( state, { params }) => {
  return {
    todos: getVisibleTodos(state.todoList, params.filter || 'all')
  }
}

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList;

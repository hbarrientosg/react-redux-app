import {connect} from 'react-redux';
import TodoList from './todoList';
import {toggleTodo} from '../actions';

const getVisibleTodos = (todoList, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todoList;
    case "SHOW_COMPLETED":
      return todoList.filter(t => t.completed);
    case "SHOW_ACTIVE":
      return todoList.filter(t => !t.completed);
    default:
      return todoList;
  }
}

const mapStateToProps = ( state ) => {
  return {
    todos: getVisibleTodos(state.todoList, state.visibilityFilter)
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    onTodoClick: ( id ) => {
      dispatch(toggleTodo(id));
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;

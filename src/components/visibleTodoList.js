import {connect} from 'react-redux';
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

const mapStateToProps = ( state, ownProps ) => {
  return {
    todos: getVisibleTodos(state.todoList, ownProps.filter)
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

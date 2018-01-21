import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TodoList from './todoList';
import {toggleTodo} from '../actions';
import {getVisibleTodos} from '../reducers';

const mapStateToProps = ( state, { params }) => {
  return {
    todos: getVisibleTodos(state, params.filter || 'all')
  }
}

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList;

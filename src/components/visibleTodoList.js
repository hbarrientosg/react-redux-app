import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TodoList from './todoList';
import * as actions from '../actions';
import {getVisibleTodos, getIsFetching} from '../reducers';


class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter ) {
      this.fetchData();
    }
  }

  fetchData() {
    const {filter, fetchTodos, requestTodos} = this.props;
    requestTodos(filter);
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, isFetching, todos, ...rest } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading ...</p>
    }
    return (
      <TodoList {...this.props} onTodoClick={toggleTodo} />
    );
  }
}

const mapStateToProps = ( state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  }
}

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;

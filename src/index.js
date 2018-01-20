import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";
const { Component } = React;

// Reducers
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

const todoItem = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state;
  }
}

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

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
}

const todoApp = combineReducers({
  todoList,
  visibilityFilter
});

// Creators
const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
  });
let nextTodoId = 0;
const addTodo = (text) => ({
    type: "ADD_TODO",
    text,
    id: nextTodoId++
})
const toggleTodo = (id) => ({ type: "TOGGLE_TODO", id })
// Presentation
const Link = ({ active, children, onClick }) => {
  if (active) {
    return (<span>{children}</span>)
  }

  return (
    <a href="#" onClick={e => {
        e.preventDefault();
        onClick();
      }}>
      {children}
    </a>
  );
};
const TodoItem = ({ onClick, completed, text }) => (
    <li onClick={onClick}
        style={{
          textDecoration: completed? "line-through" : "none"
        }}>
        {text}
    </li>
  );
const TodoList = ({ todos, onTodoClick }) => (
    <ul>
      {todos.map(todo =>
        <TodoItem
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
        />
      )}
    </ul>
  );

// Connecting presentation with Redux
const mapStateToFilterLinkProps = ( state, ownProps ) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
const mapDispatchToFilterLinkProps = ( dispatch, ownProps ) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  }
}
const FilterLink = connect(
  mapStateToFilterLinkProps,
  mapDispatchToFilterLinkProps
)(Link)

const mapStateToTodoListProps = ( state ) => {
  return {
    todo: getVisibleTodos(state.todoList, state.visibilityFilter)
  }
}
const mapDispatchToTodoListProps = ( dispatch ) => {
  return {
    onTodoClick: ( id ) => {
      dispatch(toggleTodo(id));
    }
  }
}
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

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

const Footer = () =>  (
  <p>
    Show: {' '}
    <FilterLink
      filter="SHOW_ALL"
      >All</FilterLink>
    {' '}
    <FilterLink
      filter="SHOW_ACTIVE"
      >Active</FilterLink>
    {' '}
    <FilterLink
      filter="SHOW_COMPLETED"
      >Completed</FilterLink>
  </p>);

// Todo class
const TodoApp = () => (
      <div>
        <h1>TodoApp</h1>
        <div>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </div>
      </div>
  );

// Render the app
ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
document.getElementById("root"));

store.subscribe(render);

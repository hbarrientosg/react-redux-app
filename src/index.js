import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
const { Component } = React;


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

let nextTodoId = 0;

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

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = props;
    const state = store.getState();

    return (
      <Link
        active={
          props.filter === state.visibilityFilter
        }
        onClick={() => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          });
        }}
      >
        {props.children}
      </Link>
    )
  }
}

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

class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = props;
    const state = store.getState();

    return (
      <TodoList
        todos={ getVisibleTodos(state.todoList, state.visibilityFilter) }
        onTodoClick={ (id) => {
          store.dispatch({
            type: "TOGGLE_TODO",
            id: id
          });
        }} />
    );
  }
}

const AddTodo = ({store}) => {
  let input;

  return (
    <div>
      <input ref={node => input = node} />
      <button onClick={() => {
        store.dispatch({
          type: "ADD_TODO",
          text: input.value,
          id: nextTodoId++
        });
        input.value = "";
      }}>Add todo</button>
    </div>
  );
}

const Footer = ({store}) =>  (
  <p>
    Show: {' '}
    <FilterLink
      filter="SHOW_ALL"
      store={store}>All</FilterLink>
    {' '}
    <FilterLink
      filter="SHOW_ACTIVE"
      store={store}>Active</FilterLink>
    {' '}
    <FilterLink
      filter="SHOW_COMPLETED"
      store={store}>Completed</FilterLink>
  </p>);

// Todo class
const TodoApp = ({store}) => (
      <div>
        <h1>TodoApp</h1>
        <div>
          <AddTodo store={store}/>
          <VisibleTodoList store={store} />
          <Footer store={store} />
        </div>
      </div>
  );

const store = createStore(todoApp);
// Render the app
ReactDOM.render(<TodoApp store={store} />, document.getElementById("root"));

store.subscribe(render);

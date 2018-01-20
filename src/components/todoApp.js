import React from "react";

import AddTodo from './addTodo';
import VisibleTodoList from './visibleTodoList';
import Footer from './footer';

const TodoApp = ({ params }) => (
      <div>
        <h1>TodoApp</h1>
        <div>
          <AddTodo />
          <VisibleTodoList filter={params.filter || "all"} />
          <Footer />
        </div>
      </div>
  );

export default TodoApp;

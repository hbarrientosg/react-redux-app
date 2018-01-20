import React from 'react';
import { Provider } from "react-redux";
import TodoApp from './todoApp';


const Root = ({ store }) => (
  <Provider store={store}>
    <TodoApp />
  </Provider>
);

export default Root;

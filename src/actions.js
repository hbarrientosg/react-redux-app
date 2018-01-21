import { v4 } from 'uuid';
import {getIsFetching} from './reducers';
import * as api from './api';

export const requestTodos = (filter) => ({
  type: "REQUEST_TODOS",
  filter,
})

export const receiveTodos = (filter, response) => ({
  type: "RECEIVE_TODOS",
  filter,
  response
})

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)){
    return Promise.resolve();
  }
  dispatch(requestTodos(filter));

  api.fetchTodos(filter).then(response =>
    dispatch(receiveTodos(filter, response))
  )
}



export const addTodo = (text) => ({
    type: "ADD_TODO",
    text,
    id: v4()
})

export const toggleTodo = (id) => ({ type: "TOGGLE_TODO", id })

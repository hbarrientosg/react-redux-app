import { v4 } from 'uuid';
import {getIsFetching} from './reducers';
import * as api from './api';

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)){
    return Promise.resolve();
  }
  dispatch({
    type: "FETCH_TODOS_REQUEST",
    filter,
  });

  api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: "FETCH_TODOS_SUCCESS",
        filter,
        response
      })
    },
    error => {
      dispatch({
        type: "FETCH_TODOS_FAILURE",
        filter,
        message: error.message || 'Something went wrong'
      });
    }
  )
}



export const addTodo = (text) => ({
    type: "ADD_TODO",
    text,
    id: v4()
})

export const toggleTodo = (id) => ({ type: "TOGGLE_TODO", id })

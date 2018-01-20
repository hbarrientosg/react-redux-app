import { v4 } from 'uuid';

export const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
  });

export const addTodo = (text) => ({
    type: "ADD_TODO",
    text,
    id: v4()
})

export const toggleTodo = (id) => ({ type: "TOGGLE_TODO", id })

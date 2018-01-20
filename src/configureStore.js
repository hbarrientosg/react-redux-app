import throttle from 'lodash/throttle';
import {loadState, saveState} from './localStorage';
import { createStore } from "redux";
import todoApp from './reducers';


const persistedState = loadState();

const configureStore = () => {
  const store = createStore(todoApp, persistedState);

  store.subscribe(throttle(() => {
    saveState({
      todoList: store.getState().todoList
    });
  }), 1000);

  return store;
}

export default configureStore;

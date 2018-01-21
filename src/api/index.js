import {v4} from 'uuid';
import delay from 'delay';

const fakeDatabase = {
  todoList: [{
    id: v4(),
    text: 'hola',
    completed: false
  },{
    id: v4(),
    text: 'hola 2',
    completed: false
  },{
    id: v4(),
    text: 'hola 3',
    completed: true
  }]
}

export const fetchTodos = (filter) =>
  delay(5000).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.todoList;
      case 'active':
        return fakeDatabase.todoList.filter(item => !item.completed);
      case 'completed':
        return fakeDatabase.todoList.filter(item => item.completed);
      default:
        throw new Error(`Unknow filter ${filter}`);
    }
  });

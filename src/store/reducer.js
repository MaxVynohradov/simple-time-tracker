import { createStore, combineReducers } from 'redux'
import {  START_TIMER, STOP_TIMER, DELETE_TASK, GENERATE_TASK } from './types';
import generateTasks from '../utils/generateTasks';

const initialState = {
  tasks: [],
  currentTask: {
    duration: 0,
  }
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER: 
      return { ...state, currentTask: action.currentTask }
    case STOP_TIMER:
      return { ...state, currentTask: action.currentTask, tasks: action.tasks }
    case DELETE_TASK:
      return { ...state, tasks: action.tasks }
    case GENERATE_TASK:
      return { ...state, tasks: generateTasks() }
    default:
      return { ...state }
  }
}

const reducer = combineReducers({ tasksStore: tasksReducer });

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store
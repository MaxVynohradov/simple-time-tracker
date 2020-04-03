import { createStore, combineReducers } from 'redux'
import {  START_TIMER, STOP_TIMER, DELETE_TASK, GENERATE_TASK } from './types';
import generateTasks from '../utils/generateTasks';

const initialState = {
  tasks: [],
  currentTask: {
    // startTime: new Date(),
    // stopTime: new Date(),
  }
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER: 
      return { ...state }
    case STOP_TIMER:
      return { ...state }
    case DELETE_TASK:
      return { ...state }
    case GENERATE_TASK:
      return { ...state, tasks: generateTasks() }
    default:
      return { ...state }
  }
}

const reducer = combineReducers({ tasksStore: tasksReducer });

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
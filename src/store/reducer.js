import { createStore, combineReducers } from 'redux';
import {
  START_TIMER, STOP_TIMER, DELETE_TASK, GENERATE_TASK,
} from './types';
import generateTasks from '../utils/generateTasks';
import { loadState, saveState } from '../localStorage';

const initialState = {
  tasks: [],
  currentTask: {
    duration: 0,
  },
};

const loadedStateForTaskReduce = () => {
  const loadedState = loadState();
  if (loadedState && loadedState.tasksStore) {
    const store = loadedState.tasksStore;
    store.tasks = store.tasks.map((
      {
        id, name, duration, startTime, endTime,
      },
    ) => ({
      id, name, duration, startTime: new Date(startTime), endTime: new Date(endTime),
    }));
    const { startTime, endTime } = store.currentTask;
    store.currentTask.startTime = startTime && new Date(startTime);
    store.currentTask.endTime = endTime && new Date(endTime);
    return store;
  }
  return undefined;
};

const tasksReducer = (state = loadedStateForTaskReduce() || initialState, action) => {
  switch (action.type) {
    case STOP_TIMER:
      return { ...state, currentTask: action.currentTask, tasks: action.tasks };
    case START_TIMER:
      return { ...state, currentTask: action.currentTask };
    case DELETE_TASK:
      return { ...state, tasks: action.tasks };
    case GENERATE_TASK:
      return { ...state, tasks: generateTasks() };
    default:
      return { ...state };
  }
};

const reducer = combineReducers({ tasksStore: tasksReducer });

const store = createStore(
  reducer,
  // eslint-disable-next-line no-underscore-dangle, no-undef
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => saveState(store.getState()));

export default store;

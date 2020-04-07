import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import {
  START_TIMER, STOP_TIMER, DELETE_TASK, GENERATE_TASK,
  LOAD_STORE, LOAD_STORE_REQUEST, DUMP_STORE_REQUEST,
} from './types';
import generateTasks from '../utils/generateTasks';
import { saveState } from '../localStorage';

const initialState = {
  tasks: [],
  currentTask: {
    duration: 0,
  },
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case STOP_TIMER:
      return {
        ...state,
        currentTask: { duration: 0 },
        tasks: [...state.tasks, { ...action.currentTask }],
      };
    case START_TIMER:
      return { ...state, currentTask: action.currentTask };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(({ id }) => id !== action.tasksIdToRemove),
      };
    case GENERATE_TASK:
      return { ...state, tasks: generateTasks() };
    case LOAD_STORE:
      return { ...state };
    default:
      return { ...state };
  }
};

const reducer = combineReducers({ tasksStore: tasksReducer });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, sagaMiddleware)),
);

store.runSaga = sagaMiddleware.run;

store.dispatch({ type: LOAD_STORE_REQUEST });

// eslint-disable-next-line no-undef
window.addEventListener('beforeunload', (ev) => {
  ev.preventDefault();
  store.dispatch({ type: DUMP_STORE_REQUEST });
  // saveState(store.getState());
});


export default store;

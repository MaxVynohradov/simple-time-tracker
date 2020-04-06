import { all, takeEvery, put, select } from 'redux-saga/effects';

import {
  LOAD_STORE, LOAD_STORE_REQUEST, DUMP_STORE, DUMP_STORE_REQUEST,
} from '../store/types';

import { loadState, saveState } from '../localStorage';


export function* loadStoreAsync() {
  console.log('CATCH loadStoreAsync - LOAD_STORE');
  const loadedState = loadState();
  if (!loadedState || !loadedState.tasksStore) {
    console.log('--1')
    yield put({ type: LOAD_STORE, tasks: [], currentTask: { duration: 0 } });
  } else {
    console.log('--2')
    const store = loadedState.tasksStore;
    store.tasks = store.tasks.map(({
      id, name, duration, startTime, endTime,
    }) => ({
      id, name, duration, startTime: new Date(startTime), endTime: new Date(endTime),
    }));
    const { startTime, endTime } = store.currentTask;
    store.currentTask.startTime = startTime && new Date(startTime);
    store.currentTask.endTime = endTime && new Date(endTime);
    yield put({ type: LOAD_STORE, ...store });
  }
}

export function* watchLoadStoreAsync() {
  console.log('CATCH watchLoadStoreAsync - LOAD_STORE_REQUEST');
  yield takeEvery(LOAD_STORE_REQUEST, loadStoreAsync);
}

export function* dumpStoreAsync() {
  console.log('CATCH dumpStoreAsync DUMP_STORE');
  const state = yield select((_state) => _state);
  saveState(state);
}

export function* watchDumpStoreAsync() {
  console.log('CATCH watchDumpStoreAsync DUMP_STORE_REQUEST');
  yield takeEvery(DUMP_STORE_REQUEST, dumpStoreAsync);
}

export default function* root() {
  yield all([
    watchLoadStoreAsync(),
    watchDumpStoreAsync(),
  ]);
}

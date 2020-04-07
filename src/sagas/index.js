import {
  all, takeEvery, put, select,
} from 'redux-saga/effects';

import {
  LOAD_STORE, LOAD_STORE_REQUEST, DUMP_STORE_REQUEST,
} from '../store/types';

import { loadState, saveState } from '../localStorage';


export function* loadStoreAsync() {
  const loadedState = loadState();
  if (!loadedState || !loadedState.tasksStore) {
    yield put({ type: LOAD_STORE, tasks: [], currentTask: { duration: 0 } });
  } else {
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
  yield takeEvery(LOAD_STORE_REQUEST, loadStoreAsync);
}

export function* dumpStoreAsync() {
  const state = yield select((_state) => _state);
  saveState(state);
}

export function* watchDumpStoreAsync() {
  yield takeEvery(DUMP_STORE_REQUEST, dumpStoreAsync);
}

export default function* root() {
  yield all([
    watchLoadStoreAsync(),
    watchDumpStoreAsync(),
  ]);
}

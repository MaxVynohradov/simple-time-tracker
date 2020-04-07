import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/reducer';
import rootSaga from './sagas';
import NotFoundPage from './pages/NotFoundPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import MainPage from './pages/MainPage';


import { LOAD_STORE_REQUEST } from './store/types';
import { saveState } from './localStorage';

store.runSaga(rootSaga, store.dispatch);

store.dispatch({ type: LOAD_STORE_REQUEST });


function App() {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.addEventListener('beforeunload', (ev) => {
      ev.preventDefault();
      saveState(store.getState());
    });
  }, []);

  return (
    <Provider store={store}>
      <Router basename="/simple-time-tracker">
        <Switch>
          <Redirect from="/" to="/tasks" exact />
          <Route path={['/tasks', '/chart']} exact>
            <MainPage />
          </Route>
          <Route path="/tasks/:id" exact>
            <TaskDetailsPage />
          </Route>
          <Route path="/404" component={NotFoundPage} exact />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

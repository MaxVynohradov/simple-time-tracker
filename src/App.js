import React from 'react';
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

store.runSaga(rootSaga, store.dispatch);

function App() {
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

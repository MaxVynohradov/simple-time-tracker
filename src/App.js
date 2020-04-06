import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from 'react-redux';

import store from './store/reducer';
import Timer from './components/Timer'
import InfoTabs from './components/InfoTabs'
import NotFoundPage from './components/NotFoundPage';
import TaskDetails from './components/TaskDetails';

const useStyles = makeStyles(theme => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100hv',
    margin: 0,
    border: 0,
  },
}))


function App() {
  const classes = useStyles()
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Redirect from="/" to="/tasks" exact />
          <div className={classes.app}>
            <Timer />
            <InfoTabs />
          </div>
          <Route path="/tasks/:id">
            <TaskDetails />
          </Route>
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App

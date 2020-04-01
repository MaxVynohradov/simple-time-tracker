import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timer from './components/Timer'
import InfoTabs from './components/InfoTabs'

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
    <div className={classes.app}>
      <Timer/>
      <InfoTabs/>
    </div>
  );
}

export default App

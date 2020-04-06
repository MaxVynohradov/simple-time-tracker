import React from 'react';

import Timer from './components/Timer';
import InfoTabs from './components/InfoTabs';


import useStyles from './styles';

export default function MainPage() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Timer />
      <InfoTabs />
    </div>
  );
}

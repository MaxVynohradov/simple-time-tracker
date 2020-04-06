import React, { memo } from 'react';
import { AppBar, Tabs } from '@material-ui/core';

import useStyles from './styles';
import useTabsWithRouter from './useTabsWithRouter';
import ChartTab from '../ChartTab';
import TableTab from '../TableTab';
import TabPanel from './TabPanel';
import TabLink from './TabLink';


// https://github.com/mui-org/material-ui/issues/18811
function SimpleTabs() {
  const tabValue = useTabsWithRouter(['/tasks', '/chart'], '/tasks');
  const classes = useStyles();

  return (
    <div className={classes.infoTabsContainer}>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={tabValue}>
          <TabLink value="/tasks" label="TASKS LOG" />
          <TabLink value="/chart" label="TASKS CHART" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index="/tasks">
        <TableTab />
      </TabPanel>
      <TabPanel value={tabValue} index="/chart">
        <ChartTab />
      </TabPanel>
    </div>
  );
}

export default memo(SimpleTabs);

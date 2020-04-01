import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab } from '@material-ui/core';

import useStyles from './styles'
import ChartTab from '../ChartTab'
import TableTab from '../TableTab'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.infoTabsContainer}>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label="TASKS LOG" {...a11yProps(0)} />
          <Tab label="TASKS CHART" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TableTab/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChartTab/>
      </TabPanel>
    </div>
  );
}

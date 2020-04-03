import React from 'react';
import { connect } from 'react-redux';
import {
  BarChart, Bar, CartesianGrid, Tooltip, Legend, XAxis, YAxis
} from 'recharts';
import { Button } from '@material-ui/core';

import { generateTask } from '../../store/actionsCreator'
import useStyles from './styles'

const data = [
  {
    name: 'Page A', minutes: 2400,
  },
  {
    name: 'Page B', minutes: 2210,
  },
  {
    name: 'Page C', minutes: 2290,
  },
  {
    name: 'Page D', minutes: 2000,
  },
  {
    name: 'Page E', minutes: 2181,
  },
  {
    name: 'Page F', minutes: 2500,
  },
  {
    name: 'Page G', minutes: 2100,
  },
];

function ChartTab({ tasks, generateTasks }) {
  const classes = useStyles();
  console.log('tasks', tasks);
  return (
    <div className={classes.chartContainer}>
      <BarChart
        width={950}  // calc dynamicly
        height={400}
        data={data}
        margin={{
          top: 15, right: 0, left: 0, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="minutes" fill="#3f51b5" />
      </BarChart>
      <Button 
        color="primary" 
        size="large" 
        className={classes.generateButton}
        onClick={() => generateTasks()}
      >
        GENERATE
      </Button>
    </div>
  )
}

const mapStateToProps = ({ tasksStore: { tasks } }) => ({ tasks });
const mapDispatchToProps = (dispatch) => ({
  generateTasks: () => dispatch(generateTask())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartTab)
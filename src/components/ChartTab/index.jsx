import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BarChart, Bar, CartesianGrid, Tooltip, Legend, XAxis, YAxis, Label,
} from 'recharts';
import { Button } from '@material-ui/core';

import { generateTask } from '../../store/actionsCreator';
import generateChartData from '../../utils/generateChartData';
import useStyles from './styles';

function ChartTab({ tasks, generateTasks }) {
  const classes = useStyles();
  const chartData = generateChartData(tasks);
  return (
    <div className={classes.chartContainer}>
      <BarChart
        width={950}
        height={400}
        data={chartData}
        className={classes.chart}
        margin={{
          top: 15, right: 0, left: 0, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis
          dataKey="name"
        >
          <Label value="Minutes in this hours" position="center" offset={50} />
        </XAxis>
        <YAxis type="number" domain={[0, 60]} />
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
  );
}

ChartTab.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    startTime: PropTypes.instanceOf(Date),
    endTime: PropTypes.instanceOf(Date),
    duration: PropTypes.number,
  }).isRequired).isRequired,
  generateTasks: PropTypes.func.isRequired,
};

export default connect(
  ({ tasksStore: { tasks } }) => ({ tasks }),
  { generateTasks: generateTask },
)(ChartTab);

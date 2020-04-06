import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BarChart, Bar, CartesianGrid, Tooltip, Legend, XAxis, YAxis,
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
        <XAxis dataKey="name" label={{ value: 'Minutes in this hours' }} />
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

const mapStateToProps = ({ tasksStore: { tasks } }) => ({ tasks });
const mapDispatchToProps = (dispatch) => ({
  generateTasks: () => dispatch(generateTask()),
});

ChartTab.propTypes = {
  tasks: PropTypes.arrayOf({
    id: PropTypes.string,
    name: PropTypes.string,
    startTime: PropTypes.instanceOf(Date),
    endTime: PropTypes.instanceOf(Date),
    duration: PropTypes.number,
  }).isRequired,
  generateTasks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartTab);

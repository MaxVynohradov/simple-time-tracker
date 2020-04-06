import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Paper, List, ListItem, ListItemText, Divider, Typography,
} from '@material-ui/core';

import { formatTimerCounter } from '../../utils/durationFormatter';
import useStyles from './styles';

function TaskDetails({ tasks }) {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const task = tasks.find(({ id: tasksId }) => id === tasksId);
  if (!task) return history.push('/404');
  const {
    id: taskId, name, duration, startTime, endTime,
  } = task;
  return (
    <Paper class={classes.alignItemsAndJustifyContent}>
      <h2>Task</h2>
      <List component="nav" aria-label="mailbox folders">
        <ListItem divider>
          <ListItemText primary={`ID: ${taskId}`} />
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText primary={`Name: ${name}`} />
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText primary={`Start time: ${startTime.toTimeString().split(' ')[0]}`} />
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText primary={`End time: ${endTime.toTimeString().split(' ')[0]}`} />
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText primary={`Duration: ${formatTimerCounter(duration)}`} />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => history.push('/tasks')}>
          <ListItemText
            primary={<Typography type="body2" style={{ color: '#d32f2f' }}>Go to tasks page</Typography>}
          />
        </ListItem>
      </List>
    </Paper>
  );
}

TaskDetails.propTypes = {
  tasks: PropTypes.arrayOf({
    id: PropTypes.string,
    name: PropTypes.string,
    startTime: PropTypes.instanceOf(Date),
    endTime: PropTypes.instanceOf(Date),
    duration: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = ({ tasksStore: { tasks } }) => ({ tasks });

export default connect(mapStateToProps)(TaskDetails);

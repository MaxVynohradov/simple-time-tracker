import React from 'react'
import { connect } from 'react-redux'
import { useParams, useHistory } from "react-router-dom";
import { Paper, List, ListItem, ListItemText, Divider } from '@material-ui/core';

import { formatTimerCounter } from '../../utils/durationFormatter'

function TaskDetails({ tasks }) {
  const { id } = useParams()
  const history = useHistory()
  const task = tasks.find(({ id: tasksId }) => id === tasksId)
  if (!task) history.push('/404')
  const { id: taskId, name, duration, startTime, endTime  } = task;
  return (
    <Paper>
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
          <ListItemText secondary="Go to tasks page" />
        </ListItem>
      </List>

      {/* TODO: add logic to show props  */}
    </Paper>
  )
}

const mapStateToProps = ({ tasksStore: { tasks } }) => ({ tasks })

export default connect(mapStateToProps)(TaskDetails)
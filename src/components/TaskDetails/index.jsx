import React from 'react'
import { useHistory } from "react-router-dom";
import { Paper, Button } from '@material-ui/core';

export default function TaskDetails(props) {
  const history = useHistory()
  return (
    <Paper>
      <h2>Task</h2>
       {/* TODO: add logic to show props  */}
      <Button onClick={() => history.push('/tasks')}>Go to tasks page</Button>
    </Paper>
  )
}
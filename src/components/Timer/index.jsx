import React from 'react';
import { TextField, Button } from '@material-ui/core';
import useStyles from './styles'

const Timer = (...props) => {
  const classes = useStyles()
  return (
    <div className={classes.timerContainer}>
      <TextField
        className={classes.taskNameInput}
        InputProps={{
          className: classes.taskNameInput
        }}
        placeholder="Name of your task"
      />
      <div className={classes.timerClock}>11:11:11</div>
      <Button color="primary" size="large" className={classes.stopBtn}>Stop</Button>
    </div>
  )
}

export default Timer

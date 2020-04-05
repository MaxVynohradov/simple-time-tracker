import React, { useState, useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core';

import { startTask, stopTask } from '../../store/actionsCreator'
import useStyles from './styles'

let interval;

const Timer = ({ tasks, currentTask, startTimer, stopTimer, updateTimer }) => {
  const classes = useStyles()
  const taskNameInputRef = useRef(null);
  const [counter, setCounter] = useState(currentTask.duration);
  const [buttonText, setButtonText] = useState(currentTask.duration ? 'Stop' : 'Start');

  const formatTimeUnit = useCallback(unit => unit < 10 ? `0${unit}` : `${unit}`, []);

  const formatTimerCounter = useCallback((ms) => {
    const hours = Math.floor(ms / 3600000 );
    const minutes = Math.floor((ms / 3600000 - hours) * 60);
    const seconds = Math.floor(((ms / 3600000 - hours) * 60 - minutes) * 60);
    return `${formatTimeUnit(hours)}:${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}`
  }, [formatTimeUnit]);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    }
  }, [])

  const onButtonClick = useCallback(() => {
    if (buttonText === 'Start') {
      taskNameInputRef.current.disabled = true;
      const startTime = new Date();
      startTimer({
        name: taskNameInputRef.current.value,
        duration: 0,
        startTime,
      })
      setButtonText('Stop');
      interval = setInterval(() => {
        setCounter(new Date().valueOf() - startTime.valueOf());
      }, 1000)
    } else {
      clearInterval(interval);
      const endTime = new Date();
      stopTimer({
        duration: 0,
      }, [...tasks, { ...currentTask, endTime, duration: endTime - currentTask.startTime }])
      taskNameInputRef.current.value = '';
      taskNameInputRef.current.disabled = false;
      setCounter(0);

      clearInterval(interval);
      setButtonText('Start');
    }
  }, [buttonText, currentTask, startTimer, stopTimer, tasks])

  return (
    <div className={classes.timerContainer}>
      <TextField
        className={classes.taskNameInput}
        InputProps={{
          className: classes.taskNameInput
        }}
        placeholder="Name of your task"
        autoFocus
        inputRef={taskNameInputRef}
      />
      <div className={classes.timerClock}>{formatTimerCounter(counter)}</div>
      <Button
        color="primary"
        size="large"
        className={classes.stopBtn}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </div>
  )
}

const mapStateToProps = ({ tasksStore: { tasks, currentTask } }) => ({ tasks, currentTask })

const mapDispatchToProps = (dispatch) => ({
  startTimer: (currentTask) => dispatch(startTask(currentTask)),
  stopTimer: (currentTask, tasks) => dispatch(stopTask(currentTask, tasks)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)

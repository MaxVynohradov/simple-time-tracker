import React, { useState, useCallback, useRef } from 'react';
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core';

import { startTask, stopTask } from '../../store/actionsCreator'
import useStyles from './styles'

const Timer = ({ tasks, currentTask, startTimer, stopTimer, updateTimer }) => {
  const classes = useStyles()
  const taskNameInputRef = useRef(null);
  const [counter, setCounter] = useState(currentTask.duration);
  const [buttonText, setButtonText] = useState(currentTask.duration ? 'Stop' : 'Start');

  const formatTimeUnit = useCallback(unit => unit < 10 ? `0${unit}` : `${unit}`, []);

  const formatTimerCounter = useCallback((sec) => {
    const hours = Math.floor(sec / 360)
    const minutes = Math.floor((sec % 360) / 60)
    const seconds = sec - minutes * 60 - hours * 360;
    return `${formatTimeUnit(hours)}:${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}`
  }, [formatTimeUnit]);

  const onButtonClick = useCallback(() => {
    if (buttonText === 'Start') {
      console.log('taskNameInputRef.current.value', taskNameInputRef.current.value)
      taskNameInputRef.current.disabled = true;
      startTimer({
        name: taskNameInputRef.current.value,
        duration: 0,
        startTime: new Date(),    
      })
      setButtonText('Stop');
    } else {
      const endTime = new Date();
      stopTimer({
        duration: 0,
      }, [ ...tasks, { ...currentTask, endTime, duration: endTime - currentTask.startTime } ])
      setCounter(0);
      taskNameInputRef.current.value = '';
      taskNameInputRef.current.disabled = false;
      setButtonText('Start');
    }
  }, [buttonText, startTimer, currentTask, stopTimer, tasks])
  
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
        { buttonText }
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

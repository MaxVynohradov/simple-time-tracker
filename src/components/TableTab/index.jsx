import React, { useCallback } from 'react';
import { connect } from 'react-redux'
import {
  Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';

import { deleteTask } from '../../store/actionsCreator'
import { formatTimerCounter } from '../../utils/durationFormatter'

import useStyles from './styles'


function TableTab({ tasks, deleteTask }) {
  const classes = useStyles();

  const onRemoveTaskBtnClick = useCallback((e) => {
    e.preventDefault();
    deleteTask(tasks, e.target.closest('tr').getAttribute('id'))
  }, [deleteTask, tasks])

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell align="center">Task</TableCell>
            <TableCell align="center">Task start</TableCell>
            <TableCell align="center">Task end</TableCell>
            <TableCell align="center">Time spend</TableCell>
            <TableCell align="center">Info</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length > 0 ? tasks.map(({ id, name, duration, startTime, endTime  }, idx) => (
            <TableRow key={idx} className={classes.customTr} id={id} >
              <TableCell>{idx}</TableCell>
              <TableCell align="center">{ name }</TableCell>
              <TableCell align="center">{ startTime.toTimeString().split(' ')[0] }</TableCell>
              <TableCell align="center">{ endTime.toTimeString().split(' ')[0] }</TableCell>
              <TableCell align="center">{ formatTimerCounter(duration) }</TableCell>
              <TableCell align="center">
                <Button size="large" className={classes.btnWithShadow}>Info</Button>
              </TableCell>
              <TableCell align="center">
                <Button size="large" className={classes.btnWithShadow} onClick={onRemoveTaskBtnClick} >Delete</Button>
              </TableCell>
            </TableRow>
          )) :  <p>Table Empty</p> }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const mapStateToProps = ({ tasksStore: { tasks } }) => ({ tasks });

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (tasks, tasksIdToRemove) => dispatch(deleteTask(tasks.filter(({ id }) => id !== tasksIdToRemove)))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableTab)
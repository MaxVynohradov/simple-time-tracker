import React from 'react';
import { connect } from 'react-redux'
import {
  Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';

import { deleteTask } from '../../store/actionsCreator'
import { formatTimerCounter } from '../../utils/durationFormatter'

import useStyles from './styles'


function TableTab({ tasks, deleteTask }) {
  const classes = useStyles();

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
          {tasks.map(({ name, duration, startTime, endTime  }, indx) => (
            <TableRow key={indx} className={classes.customTr}>
              <TableCell>{indx}</TableCell>
              <TableCell align="center">{ name }</TableCell>
              <TableCell align="center">{ startTime.toTimeString().split(' ')[0] }</TableCell>
              <TableCell align="center">{ endTime.toTimeString().split(' ')[0] }</TableCell>
              <TableCell align="center">{ formatTimerCounter(duration) }</TableCell>
              <TableCell align="center">
                <Button size="large" className={classes.btnWithShadow}>Info</Button>
              </TableCell>
              <TableCell align="center">
                <Button size="large" className={classes.btnWithShadow}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const mapStateToProps = ({ tasksStore: { tasks } }) => ({ tasks });

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (tasks) => dispatch(deleteTask(tasks))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableTab)
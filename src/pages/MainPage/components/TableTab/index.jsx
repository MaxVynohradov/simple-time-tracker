import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { deleteTask } from '../../../../store/actionsCreator';
import { formatTimerCounter } from '../../../../utils/durationFormatter';

import useStyles from './styles';


// eslint-disable-next-line no-shadow
function TableTab({ tasks, deleteTask }) {
  const classes = useStyles();
  const history = useHistory();

  const onRemoveTaskBtnClick = useCallback(
    (id) => () => deleteTask(id),
    [deleteTask],
  );

  const onInfoTaskBtnClick = useCallback((e) => history.push(`/tasks/${e.target.closest('tr').getAttribute('id')}`), [history]);

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
          {tasks.length > 0 ? tasks.map(({
            id, name, duration, startTime, endTime,
          }, idx) => (
            <TableRow key={id} className={classes.customTr}>
              <TableCell>{idx}</TableCell>
              <TableCell align="center">{ name }</TableCell>
              <TableCell align="center">{ startTime.toTimeString().split(' ')[0] }</TableCell>
              <TableCell align="center">{ endTime.toTimeString().split(' ')[0] }</TableCell>
              <TableCell align="center">{ formatTimerCounter(duration) }</TableCell>
              <TableCell align="center">
                <Button size="large" className={classes.btnWithShadow} onClick={onInfoTaskBtnClick}>Info</Button>
              </TableCell>
              <TableCell align="center">
                <Button size="large" className={classes.btnWithShadow} onClick={onRemoveTaskBtnClick(id)}>Delete</Button>
              </TableCell>
            </TableRow>
          )) : <p>Table Empty</p> }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableTab.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    startTime: PropTypes.instanceOf(Date),
    endTime: PropTypes.instanceOf(Date),
    duration: PropTypes.number,
  }).isRequired).isRequired,
  deleteTask: PropTypes.func.isRequired,
};


export default connect(
  ({ tasksStore: { tasks } }) => ({ tasks }),
  { deleteTask },
)(memo(TableTab));

import React from 'react';
import { connect } from 'react-redux'
import {
  Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';


import useStyles from './styles'


function TableTab() {
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
          {Array.from(Array(5)).map((row, indx) => (
            <TableRow key={indx} className={classes.customTr}>
              <TableCell>{indx}</TableCell>
              <TableCell align="center">Task</TableCell>
              <TableCell align="center">Task start</TableCell>
              <TableCell align="center">Task end</TableCell>
              <TableCell align="center">Time spend</TableCell>
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

export default connect(mapStateToProps)(TableTab)
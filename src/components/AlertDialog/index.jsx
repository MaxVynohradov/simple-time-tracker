import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide,
} from '@material-ui/core';

import useStyles from './styles';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = forwardRef((props, ref) => (<Slide direction="up" ref={ref} {...props} />));

const AlertDialog = ({ dialogOpen, setDialogOpen, taskNameInputRef }) => {
  const onClose = () => {
    // eslint-disable-next-line no-param-reassign
    taskNameInputRef.current.disabled = false;
    setDialogOpen(false);
  };
  return (
    <Dialog
      open={dialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setDialogOpen(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title"><span className={useStyles().dialogTitle}>Empty task name</span></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          You are trying close your task without name, enter the title and try again!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
  taskNameInputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
};

export default AlertDialog;

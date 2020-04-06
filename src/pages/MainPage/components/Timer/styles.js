import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  timerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 0 30px 0',
    padding: '20px 0 0 0',
  },
  timerClock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    boxShadow: theme.shadows[6],
    width: '200px',
    height: '200px',
    margin: '30px',
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.h4.fontSize,
  },
  stopBtn: {
    boxShadow: theme.shadows[5],
  },
  taskNameInput: {
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
}));

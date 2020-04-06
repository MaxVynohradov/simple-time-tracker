import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  chart: {
    alignSelf: 'center',
  },
  generateButton: {
    width: '100px',
    alignSelf: 'flex-end',
    boxShadow: theme.shadows[6],
  },
}));

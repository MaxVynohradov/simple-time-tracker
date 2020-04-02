import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  generateButton: {
    width: '100px',
    alignSelf: 'flex-end',
    boxShadow: theme.shadows[6],
  }
}))
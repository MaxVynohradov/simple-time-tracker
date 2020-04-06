import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  alignItemsAndJustifyContent: {
    width: 500,
    alignSelf: 'center',
    margin: '20px auto 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: theme.shadows[6],
  },
}));

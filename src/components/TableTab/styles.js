import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  btnWithShadow: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  customTr: {
    backgroundColor: '#EAF6FF',
  },
}));

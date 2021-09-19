import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {drawerWidth} from '../../libs/css-constants';

const useStyle = makeStyles(theme => ({
  copyright: {

    color: 'white',
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    marginLeft: drawerWidth,
    [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
    },
    backgroundColor: 'black',
},
}))

const Copyright = () => {
  const classes = useStyle();
    return (
      <div className={classes.content}>
      <Typography variant="body2" className={classes.copyright} color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit"  component={RouterLink} to="/">
          Emak God's Own Schools
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      </div>
    );
  }

  export default Copyright;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { logoutStaff } from '../../redux/actions/staff-action';
import { useSelector } from 'react-redux';
import { drawerWidth } from '../../libs/css-constants';
import { CssBaseline } from '@material-ui/core';
import { isAdmin } from '../../libs/client-page-auth';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(7),
  },
  menuButton: {
    marginRight: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#00897b',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuItem: {
    fontSize: '1rem',
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#4d380d',
      color: theme.palette.common.white,
    },
    '&:focus': {
      backgroundColor: '#00897b',
      color: theme.palette.common.white,
    },
  },
}));

export default function MenuAppBar({ handleMenuButtonClick, ...props }) {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const location = useLocation();
  const logout = useLogout(logoutStaff, '/');
  const { isAuthenticated } = useSelector(state => state.staff)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToPath = path => {
    history.push(path);
    handleClose();
  }

  const logoutClose = () => {
    logout();
    handleClose();
  }

  const currentPath = (path) => {
    return path === location.pathname;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="sidenav button"
            onClick={handleMenuButtonClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Emak Schools
          </Typography>
          {isAuthenticated ?
            <div>
              <IconButton
                aria-label="user's account"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={open}
                onClose={handleClose}
                getContentAnchorEl={null}
              >
                <MenuItem
                  selected={currentPath('/staff/data/dashboard')}
                  dense
                  className={classes.menuItem}
                  onClick={() => goToPath('/staff/data/dashboard')}
                >
                  Dashboard
                </MenuItem>
                {
                  isAdmin() &&
                  <MenuItem
                    selected={currentPath('/admin/admin-panel')}
                    dense
                    className={classes.menuItem}
                    onClick={() => goToPath('/admin/admin-panel')}
                  >
                    AdminPanel
                  </MenuItem>
                }
                <MenuItem
                  dense
                  className={classes.menuItem}
                  onClick={logoutClose}
                >
                  logout
                </MenuItem>
              </Menu>
            </div>
            :
            <Link underline='none' color='inherit' component={RouterLink} to="/staffs/login">
              Login
            </Link>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

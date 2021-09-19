import React from 'react';
import NavDrawer from './NavDrawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {drawerWidth} from "../../libs/css-constants";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const SideNav = ({toggleNav, mobileOpen, ...props}) => {
    const classes = useStyles();
    const { window } = props;

  const container = window !== undefined ? () => window().document.body : undefined;
 
  return (
        <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <NavDrawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={toggleNav}
            classes={{
                paper: classes.drawerPaper,
              }}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
          >

          </NavDrawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <NavDrawer
            classes={{
                paper: classes.drawerPaper,
              }}
            variant="permanent"
            open
          ></NavDrawer>
        </Hidden>
      </nav>
    )
}

SideNav.propTypes = {
    window: PropTypes.func,
  };

export default SideNav

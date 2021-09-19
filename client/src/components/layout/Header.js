import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import MenuAppBar from './MenuAppBar';
import SideNav from './SideNav';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

function Header(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuAppBar 
      handleMenuButtonClick={handleDrawerToggle} 
      drawerWidth={drawerWidth}
      />
      <SideNav mobileOpen={mobileOpen} toggleNav={handleDrawerToggle} />
    </div>
  );
}

export default Header;

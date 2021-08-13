import React, { useState, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideNav from './SideNav';
import { Hidden } from '@material-ui/core';
import myStyles from '../../css';


const useStyles = myStyles();


export default function Header(props) {
    const classes = useStyles()
    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    return (
        <Fragment>
            <AppBar position="static"
                className={classes.appBar}
            >
                <Toolbar>
                    <IconButton
                        onClick={handleDrawerToggle}
                        edge="start"
                        className={classes.menuButton}
                    >
                        <MenuIcon fontSize='large' />
                    </IconButton>
                    <Typography>
                        Emak Schools
                    </Typography>
                </Toolbar>
            </AppBar>
            <Hidden mdUp>
                <SideNav
                    onOpen={mobileOpen}
                    onClosed={handleDrawerToggle}
                    variant='temporary'
                    container={container}
                    ModalProps={true}
                />
            </Hidden>
            <Hidden smDown>
                <SideNav
                    onOpen={true}
                    variant='permanent'
                    ModalProps={false}
                />
            </Hidden>
        </Fragment>
    )
}

import React, { Fragment } from 'react'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import myStyles from '../../css';

import schoolLogo from '../../images/sch-logo-250x180.png';
const useStyles = myStyles();
const useStyles1 = makeStyles({
    img: {
        marginLeft: 50,
        marginTop: 5
    }
})

export default function SideNav(props) {
    const { onOpen, onClosed, variant, ModalProps, container } = props;
    // const classes = useStyles();
    const classes = useStyles();
    const history = useHistory()
    const style = useStyles1();

    const handleMobileLinkClick = path => {
        if (onClosed) {
            onClosed();
        }
        history.push(path);
    }
    return (
        <Fragment>
            <Drawer
                open={onOpen}
                onClose={onClosed}
                variant={variant}
                classes={{
                    paper: classes.drawerPaper
                }}
                container={container}
                ModalProps={{
                    keepMounted: ModalProps, // Better open performance on mobile.
                }}
            >
                <div className={classes.toolbar} >
                    <div className={style.img}>
                        <img src={schoolLogo} alt='school logo' height='100' />
                    </div>
                </div>
                <Divider className={classes.divider} />
                <List>
                    <ListItem
                        button
                        key={'Home'}
                        onClick={() => handleMobileLinkClick('/')}
                        className={classes.sideNavItems}
                    >
                        <ListItemIcon> <HomeIcon className={classes.sideNavItems} /> </ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItem>
                    <ListItem
                        button
                        key={'Contacts'}
                        onClick={() => handleMobileLinkClick('/contacts')}
                        className={classes.sideNavItems}
                    >
                        <ListItemIcon> <PermContactCalendarIcon className={classes.sideNavItems} /> </ListItemIcon>
                        <ListItemText primary={'Contacts'} />
                    </ListItem>
                    <ListItem
                        button
                        key={'About'}
                        onClick={() => handleMobileLinkClick('/about')}
                        className={classes.sideNavItems}
                    >
                        <ListItemIcon> <InfoIcon className={classes.sideNavItems} /> </ListItemIcon>
                        <ListItemText primary={'About'} />
                    </ListItem>
                </List>
                <Divider className={classes.divider} />
            </Drawer>
        </Fragment>
    )
}

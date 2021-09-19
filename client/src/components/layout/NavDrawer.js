import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import AdminSideNav from '../pages/admin/AdminSideNav';
import ConditionalNavLink from './ConditionalNavLink';
import schoolLogo from '../../images/sch-logo-250x180.png';
import {themeColor} from "../../libs/css-constants";

const useStyles = makeStyles(theme => ({
    img: {
        marginBottom: 10,
        marginTop: 10,
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appBarLink: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    divider: {
        backgroundColor: themeColor,
        borderWidth: 1.3,
        borderBlockStyle: "solid",
    },

    listItemText: {
        color: themeColor,
        fontSize: '0.7rem',
    },
    listItems: {
        display: 'grid',
        paddingLeft: theme.spacing(1.4),
        gridTemplateColumns: '1fr 5fr',
        paddingBottom: 0,
        paddingTop: 0,
    },
    listItemIcon: {
        fontSize: '0.9rem',
        color: themeColor,
    },
}))

const NavDrawer = ({ children, open,
    container, ModalProps,
    onClose, className,
    classes, onClick,
    variant, ...props
}) => {
    const style = useStyles();
    const history = useHistory();
    const { data } = useSelector(state => state.staff.staff);

    const handleMobileLinkClick = path => {
        if (onClose) {
            onClose();
        }
        history.push(path);
    }

    return (
        <>
            <Drawer
                container={container && container}
                variant={variant}
                open={open ? true : false}
                onClose={onClose}
                classes={classes}
                ModalProps={ModalProps}
                onClick={onClick}
                className={className}
                {...props}
            >
                <div className={style.toolbar} >
                    <div className={style.img}>
                        <img src={schoolLogo} alt='school logo' height='100' />
                    </div>
                    </div>
                <Divider className={style.divider} />
                <List dense >
                    <ListItem
                        button
                        key={'Home'}
                        onClick={() => handleMobileLinkClick('/')}
                        className={style.listItems}
                    >
                        <ListItemIcon> <HomeIcon className={style.listItemIcon} /> </ListItemIcon>
                        <ListItemText 
                        className={style.listItemText}
                        disableTypography
                        primary={'Home'} />
                    </ListItem>
                    <ListItem
                        button
                        key={'Contacts'}
                        onClick={() => handleMobileLinkClick('/contacts')}
                        className={style.listItems}
                    >
                        <ListItemIcon> <PermContactCalendarIcon className={style.listItemIcon} /> </ListItemIcon>
                        <ListItemText 
                        className={style.listItemText}
                        disableTypography
                        primary={'Contacts'} />
                    </ListItem>
                    <ListItem
                        button
                        key={'About'}
                        onClick={() => handleMobileLinkClick('/about')}
                        className={style.listItems}
                    >
                        <ListItemIcon> <InfoIcon className={style.listItemIcon} /> </ListItemIcon>
                        <ListItemText 
                        className={style.listItemText}
                        disableTypography
                        primary={'About'} />
                    </ListItem>
                </List>
                <Divider className={style.divider} />
                {(data  && data.roles && (data.roles.includes('admin') || data.roles.includes('super-admin'))) && <AdminSideNav onClose={onClose} />}
                <List dense className={style.appBarLink}>
                    <ConditionalNavLink onClick={handleMobileLinkClick} color='#527175' onClose={onClose} />
                </List>
                
            </Drawer>
        </>
    )
}

export default NavDrawer

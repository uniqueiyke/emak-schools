import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import useLogout from '../../hooks/useLogout';
import { logoutStaff } from '../../redux/actions/staff-action';
import { useHistory } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { ListItemIcon } from '@material-ui/core';
import { themeColor } from '../../libs/css-constants';
import BallotIcon from '@material-ui/icons/Ballot';

const useStyles = makeStyles(theme => ({
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

export default function ConditionalNavLink({ onClose, ...props }) {

    const classes = useStyles(props);
    const { staff } = useSelector(state => state);
    const logout = useLogout(logoutStaff, '/');
    const history = useHistory();

    const logoutClose = () => {
        logout();
        onClose();
    }
    const handleMobileLinkClick = path => {
        if (onClose) {
            onClose();
        }
        history.push(path);
    }

    if (staff.isAuthenticated) {
        return (
            <>
                <ListItem
                    button
                    key={'dashboard'}
                    onClick={() => handleMobileLinkClick('/staff/data/dashboard')}
                    className={classes.listItems}
                    disableGutters
                >
                    <ListItemIcon  ><DashboardIcon className={classes.listItemIcon} /></ListItemIcon>
                    <ListItemText disableTypography className={classes.listItemText} primary={'Dashboard'} />
                </ListItem>
                <ListItem
                    button
                    key={'profile'}
                    onClick={() => handleMobileLinkClick('/staff/data/profile')}
                    className={classes.listItems}
                >
                    <ListItemIcon ><AccountBoxIcon className={classes.listItemIcon} /></ListItemIcon>
                    <ListItemText primary={'Profile'} className={classes.listItemText} disableTypography />
                </ListItem>
                {(staff.staff.data && (staff.staff.data.roles.includes('admin') || staff.staff.data.roles.includes('super-admin'))) &&
                    <ListItem
                        button
                        key={'adminpanel'}
                        onClick={() => handleMobileLinkClick('/admin/admin-panel')}
                        className={classes.listItems}
                    >
                        <ListItemIcon><BallotIcon className={classes.listItemIcon} /> </ListItemIcon>
                        <ListItemText disableTypography primary={'AdminPanel'} className={classes.listItemText} />
                    </ListItem>
                }
                <ListItem
                    button
                    key={'logout'}
                    onClick={logoutClose}
                    className={classes.listItems}
                >
                    <ListItemText disableTypography className={classes.listItemText} inset primary={'Logout'} />
                </ListItem>
            </>
        )
    } else {
        return (
            <ListItem
                button
                key={'login'}
                onClick={() => handleMobileLinkClick('/staffs/login')}
                className={classes.listItems}
            >
                <ListItemText disableTypography inset primary={'Login'} className={classes.listItemText} />
            </ListItem>
        )
    }
}

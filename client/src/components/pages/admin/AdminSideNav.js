import React, { Fragment } from 'react'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
import AddStudentIcon from '@material-ui/icons/PersonAdd';
import StudentIcon from '@material-ui/icons/Wc';
import TeachersIcon from '@material-ui/icons/People';
import AddTeachersIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core/styles";

import { themeColor } from "../../../libs/css-constants";

const useStyles = makeStyles(theme => ({
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
}));

export default function AdminSideNav(props) {
    const { onClose } = props;
    const classes = useStyles();
    const history = useHistory();

    const handleMobileLinkClick = path => {
        if (onClose) {
            onClose();
        }
        history.push(path);
    }
    return (
        <Fragment>
            <List dense >
                <ListItem
                    button
                    key={'Admin-Teachers'}
                    onClick={() => handleMobileLinkClick('#')}
                    className={classes.listItems}
                    disableGutters
                >
                    <ListItemIcon> <TeachersIcon className={classes.listItemIcon} /> </ListItemIcon>
                    <ListItemText
                        disableTypography
                        className={classes.listItemText}
                        primary={'Teachers'}
                    />
                </ListItem>
                <ListItem
                    button
                    key={'Admin-Add-Teacher'}
                    onClick={() => handleMobileLinkClick('#')}
                    className={classes.listItems}
                    disableGutters
                >
                    <ListItemIcon> <AddTeachersIcon className={classes.listItemIcon} /> </ListItemIcon>
                    <ListItemText
                        primary={'Add Teacher'}
                        className={classes.listItemText}
                        disableTypography
                    />
                </ListItem>
            </List>
            <Divider className={classes.divider} />
            <List dense>
                <ListItem
                    button
                    key={'Admin-Students'}
                    onClick={() => handleMobileLinkClick('/admin/students/list')}
                    className={classes.listItems}
                    disableGutters
                >
                    <ListItemIcon> <StudentIcon className={classes.listItemIcon} /> </ListItemIcon>
                    <ListItemText
                        primary={'Students'}
                        className={classes.listItemText}
                        disableTypography
                    />
                </ListItem>
                <ListItem
                    disableGutters
                    button
                    key={'Admin-Add-Student'}
                    onClick={() => handleMobileLinkClick('/admin/add-student')}
                    className={classes.listItems}
                >
                    <ListItemIcon> <AddStudentIcon className={classes.listItemIcon} /> </ListItemIcon>
                    <ListItemText
                        primary={'Register Student'}
                        className={classes.listItemText}
                        disableTypography
                    />
                </ListItem>
            </List>
            <Divider className={classes.divider} />
        </Fragment>
    )
}

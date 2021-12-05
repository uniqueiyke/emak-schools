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
import AddBoxIcon from '@material-ui/icons/AddBox';

import { themeColor } from "../../../libs/css-constants";
import { isAdmin } from '../../../libs/client-page-auth';

const useStyles = makeStyles(theme => ({
    divider: {
        backgroundColor: themeColor,
        borderWidth: 1.3,
        borderBlockStyle: "solid",
    },
    listItemText: {
        color: themeColor,
        fontSize: '1rem',
    },
    listItems: {
        display: 'grid',
        paddingLeft: theme.spacing(2),
        gridTemplateColumns: '1fr 5fr',
        paddingBottom: 0,
        paddingTop: 0,
    },
    listItemIcon: {
        fontSize: '1.2rem',
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
            {isAdmin(true) &&
                <>
                    <List dense >
                        <ListItem
                            button
                            key={'Admin-Staff'}
                            onClick={() => handleMobileLinkClick('/admin/all-staff')}
                            className={classes.listItems}
                            disableGutters
                        >
                            <ListItemIcon> <TeachersIcon className={classes.listItemIcon} /> </ListItemIcon>
                            <ListItemText
                                disableTypography
                                className={classes.listItemText}
                                primary={'Staff'}
                            />
                        </ListItem>
                        <ListItem
                            button
                            key={'Admin-Add-Staff'}
                            onClick={() => handleMobileLinkClick('#')}
                            className={classes.listItems}
                            disableGutters
                        >
                            <ListItemIcon> <AddTeachersIcon className={classes.listItemIcon} /> </ListItemIcon>
                            <ListItemText
                                primary={'Add Staff'}
                                className={classes.listItemText}
                                disableTypography
                            />
                        </ListItem>
                    </List>
                    <Divider className={classes.divider} />
                </>
            }
            <List dense>
                <ListItem
                    button
                    key={'Current-Students'}
                    onClick={() => handleMobileLinkClick('/admin/current-students/list')}
                    className={classes.listItems}
                    disableGutters
                >
                    <ListItemIcon> <StudentIcon className={classes.listItemIcon} /> </ListItemIcon>
                    <ListItemText
                        primary={'Current Students'}
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
                {
                    isAdmin(true) && <ListItem
                        disableGutters
                        button
                        key={'Grade-Book'}
                        onClick={() => handleMobileLinkClick('/admin/students/select-students')}
                        className={classes.listItems}
                    >
                        <ListItemIcon> <AddBoxIcon className={classes.listItemIcon} /> </ListItemIcon>
                        <ListItemText
                            primary={'Create GradeBook'}
                            className={classes.listItemText}
                            disableTypography
                        />
                    </ListItem>
                }
            </List>
            <Divider className={classes.divider} />
            <List dense>
                <ListItem
                    button
                    key={'All-Students'}
                    onClick={() => handleMobileLinkClick('/admin/all-students/list')}
                    className={classes.listItems}
                    disableGutters
                >
                    <ListItemIcon> <StudentIcon className={classes.listItemIcon} /> </ListItemIcon>
                    <ListItemText
                        primary={'All Students'}
                        className={classes.listItemText}
                        disableTypography
                    />
                </ListItem>
            </List>
            <Divider className={classes.divider} />
        </Fragment>
    )
}

import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    tableCell: {
        color: 'blue',
        fontSize: '0.7rem',
        lineHeight: 1.2,
        textAlign: 'center',
        backgroundColor: 'black',
    }
  })

const StudentsTableHeadData = () => {
    const classes = useStyle();
    return (
        <TableRow>
            <TableCell className={classes.tableCell}>S/N</TableCell>
            <TableCell className={classes.tableCell} align="right">Reg. Number</TableCell>
            <TableCell className={classes.tableCell} align="right">Surname</TableCell>
            <TableCell className={classes.tableCell} align="right">First Name</TableCell>
            <TableCell className={classes.tableCell} align="right">Other Names</TableCell>
            <TableCell className={classes.tableCell} align="right">Gender</TableCell>
            <TableCell className={classes.tableCell} align="right">Current Class</TableCell>
        </TableRow>
    )
}

export default StudentsTableHeadData;

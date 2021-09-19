import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Link as RouteLink} from 'react-router-dom';
import clsx from 'clsx';

const useStyle = makeStyles({
    tableCell: {
        color: 'white',
        fontSize: '0.6rem',
        lineHeight: 1.2,
        textAlign: 'center',
        padding: 10,
    },
    link:{
        color: 'white',
    },
    firstRow: {
        color: 'red',
    },
    rows: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#122c30',
          },
          '&:nth-of-type(even)': {
            backgroundColor: '#2d6972',
          },
         '&:hover': {
            backgroundColor: 'gray',
            cursor: 'pointer',
          },
    }
  })

const StudentsTableBodyData = ({studentData, index, onClick}) => {
    const classes = useStyle();
    return (
        <TableRow onDoubleClick={onClick} className={classes.rows} >
            <TableCell className={clsx(classes.tableCell, classes.firstRow)} >{index + 1}</TableCell>
            <TableCell className={classes.tableCell} align="right"><Link className={classes.link} component={RouteLink} to={`/admin/students/student/profile/${studentData._id}`} >{studentData.reg_number}</Link></TableCell>
            <TableCell className={classes.tableCell} align="right">{studentData.name.last_name}</TableCell>
            <TableCell className={classes.tableCell} align="right">{studentData.name.first_name}</TableCell>
            <TableCell className={classes.tableCell} align="right">{studentData.name.other_names}</TableCell>
            <TableCell className={classes.tableCell} align="right">{studentData.gender}</TableCell>
            <TableCell className={classes.tableCell} align="right">{studentData.current_class}</TableCell>
        </TableRow>
    )
}

export default StudentsTableBodyData

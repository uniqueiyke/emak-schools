import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import CheckableTableCell from './CheckableTableCell';

const useStyle = makeStyles({
    tableCell: {
        color: 'white',
        fontSize: '1rem',
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


const SortTableBody = ({studentData, 
    selected, 
    tabIndex, 
    onClick, 
    checked, inputProps,
    ariaChecked,
}) => {
    const classes = useStyle();
    return (
        <TableRow 
        onClick={onClick}
        className={classes.rows} 
        selected={selected} 
        aria-checked={ariaChecked}
        tabIndex={tabIndex}
        role="checkbox"
        >
            <CheckableTableCell size='small' padding='checkbox' checked={checked} inputProps={inputProps} />
            <TableCell size='small' padding='none' className={classes.tableCell} align="right">{studentData.reg_number}</TableCell>
            <TableCell size='small' padding='none' className={classes.tableCell} align="right">{studentData.name.last_name}</TableCell>
            <TableCell size='small' padding='none' className={classes.tableCell} align="right">{studentData.name.first_name}</TableCell>
            <TableCell size='small' padding='none' className={classes.tableCell} align="right">{studentData.current_class}</TableCell>
            <TableCell size='small' padding='none' className={classes.tableCell} align="right">{studentData.gender}</TableCell>
        </TableRow>
    )
}

export default SortTableBody

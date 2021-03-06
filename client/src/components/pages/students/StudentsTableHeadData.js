import { TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import SortableTableCell from './SortableTableCell';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    tableCell: {
        color: 'blue',
        fontSize: '1rem',
        lineHeight: 1.2,
        textAlign: 'center',
        backgroundColor: 'black',
    }
  })

const StudentsTableHeadData = ({
    indeterminate, checked,
    onChange, inputProps,
    order, orderBy, orderID,
    active, onClick, direction,
}) => {
    const classes = useStyle();
    return (
        <TableHead>
            <TableRow>
                <TableCell className={classes.tableCell}>S/N</TableCell>
                <SortableTableCell
                    order={order}
                    orderBy={orderBy}
                    orderID={orderID}
                    active={active}
                    onClick={onClick}
                    direction={direction}
                >Reg. Number</SortableTableCell>
                <SortableTableCell
                    order={order}
                    orderBy={orderBy}
                    orderID={orderID}
                    active={active}
                    onClick={onClick}
                    direction={direction}
                >Surname</SortableTableCell>
                <SortableTableCell
                    order={order}
                    orderBy={orderBy}
                    orderID={orderID}
                    active={active}
                    onClick={onClick}
                    direction={direction}
                >First Name</SortableTableCell>
                <SortableTableCell
                    order={order}
                    orderBy={orderBy}
                    orderID={orderID}
                    active={active}
                    onClick={onClick}
                    direction={direction}
                >Other Names</SortableTableCell>
                <SortableTableCell
                    order={order}
                    orderBy={orderBy}
                    orderID={orderID}
                    active={active}
                    onClick={onClick}
                    direction={direction}
                >Current Class</SortableTableCell>
                <SortableTableCell
                    order={order}
                    orderBy={orderBy}
                    orderID={orderID}
                    active={active}
                    onClick={onClick}
                    direction={direction}
                >Gender</SortableTableCell>
            </TableRow>
        </TableHead>
    )
}

export default StudentsTableHeadData;

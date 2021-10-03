import { TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import CheckableTableCell from './CheckableTableCell';
import SortableTableCell from './SortableTableCell';



const SortTableHead = ({
    indeterminate, checked,
    onChange, inputProps,
    order, orderBy, orderID,
    active, onClick, direction,
}) => {

    return (
        <TableHead>
            <TableRow>
                <CheckableTableCell
                    size='small'
                    padding='checkbox'
                    indeterminate={indeterminate}
                    checked={checked}
                    onChange={onChange}
                    inputProps={inputProps}
                />
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

export default SortTableHead

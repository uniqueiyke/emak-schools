import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    tableCell: {
        color: 'blue',
        fontSize: '1rem',
        lineHeight: 1.2,
        textAlign: 'center',
        backgroundColor: 'white',
    },
    checkboxStyle: {
        backgroundColor: "white",
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
})
const SortableTableCell = ({
    key, order, orderBy,
    onClick, children,
    orderID
}) => {

    const classes = useStyle();

    return (
        <>
            <TableCell
                key={key}
                sortDirection={orderBy === orderID ? order : false}
                size='small'
                padding='none'
                className={classes.tableCell}
                align="right"
            >
                <TableSortLabel
                    active={orderBy===children}
                    direction={orderBy===orderID ? order : 'asc'}
                    onClick={onClick}
                >
                    {children}
                    {orderBy === orderID ? (
                        <em className={classes.visuallyHidden} >
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </em>
                    ) : null}
                </TableSortLabel>
            </TableCell>
        </>
    )
}

export default SortableTableCell

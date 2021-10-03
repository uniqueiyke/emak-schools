import React from 'react';
import { Checkbox, TableCell } from '@material-ui/core';

const CheckableTableCell = ({
    checked, color, size,
    disabled, indeterminate,
    onChange, required, value,
    className, sortDirection, padding, classes,
    inputProps,
    checkboxClass, align, ...props
}) => {
    return (
        <TableCell
            sortDirection={sortDirection}
            padding={padding}
            className={className}
            align={align}
            {...props}
        >
            <Checkbox
                className={checkboxClass}
                checked={checked}
                color={color}
                size={size}
                disabled={disabled}
                indeterminate={indeterminate}
                onChange={onChange}
                required={required}
                value={value}
                {...props}
               classes={classes}
               inputProps={inputProps}
            />
        </TableCell>
    )
}

export default CheckableTableCell;

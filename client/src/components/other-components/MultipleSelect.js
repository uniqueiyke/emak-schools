import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


const MultipleSelect = ({listOptions, labelId, helperText, label, onChange, value, name, required, error, ...props}) => {
  
    return (
      <div>
        <FormControl variant="outlined" fullWidth >
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            labelId={labelId}
            name={name}
            multiple
            value={value}
            onChange={onChange}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            required={required}
            error={error}
            label={label}
            {...props}
          >
            {listOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox checked={value.indexOf(option.value) > -1} />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{helperText}</FormHelperText>
        </FormControl>
      </div>
    );
}

MultipleSelect.propTypes = {
  listOptions: PropTypes.array.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  labelId: PropTypes.string, 
  helperText: PropTypes.string,
  required: PropTypes.bool, 
  error: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.any,
}

export default MultipleSelect

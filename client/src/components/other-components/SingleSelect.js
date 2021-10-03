import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
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

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);


const SingleSelect = ({ 
  listOptions, labelId, helperText, 
  label, onChange, className, value, variant,
  name, required, error, fullWidth, ...props
}) => {

  return (
    <div>
      <FormControl required={required} error={error} variant={variant ? variant : "outlined"} fullWidth={fullWidth ? fullWidth : true} className={className} >
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          name={name}
          value={value}
          onChange={onChange}
          MenuProps={MenuProps}
          required={required}
          renderValue={(selected) => selected}
          error={error}
          label={label}
          {...props}
        >
          {listOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <GreenRadio
                checked={value === option.value}
                onChange={onChange}
                value={value}
                name={name}
              />
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}


SingleSelect.propTypes = {
  listOptions: PropTypes.array.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  labelId: PropTypes.string, 
  helperText: PropTypes.string,
  required: PropTypes.bool, 
  error: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.any,
  fullWidth: PropTypes.bool,
  variant: PropTypes.string,
}

export default SingleSelect

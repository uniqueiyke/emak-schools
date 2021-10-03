import React from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';
import Select from '@material-ui/core/Select';
import { MenuItem, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: 'flex',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {

  },
  filterContainer: {
    // flex: '1 1 100%',
    display: 'flex',
    justifyContent: 'space-between',
  }
}));

const FilterTableToolBar = ({
  numSelected, filterFields, value,
  onChange, onKeyUp, filterField,
  onFilterChange, filter, toggleFilter,
}) => {

  const classes = useStyles();

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 && (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected}
        </Typography>
      )}
      <Tooltip title="Filter list">
        <IconButton onClick={toggleFilter} aria-label="filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      {
        filter &&
        (<Typography className={classes.filterContainer} variant="h6" id="tableTitle" component="div">
          <Select
            value={filterField}
            onChange={onFilterChange}
            placeholder="Filter by:"
            style={{ margin: "0px 5px" }}
          >
            {
              filterFields.map(filed => (
                <MenuItem key={filed} value={filed} >
                  {filed}
                </MenuItem>
              ))
            }
          </Select>
          <TextField
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}
            placeholder='Search text'
            style={{ margin: "0px 5px" }}
          />
        </Typography>)
      }
    </Toolbar>
  );
}


FilterTableToolBar.propTypes = {
  numSelected: PropTypes.number,
  filterFields: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  onFilterChange: PropTypes.func,
  filterField: PropTypes.string,
  onAddStudents: PropTypes.func,
};

export default FilterTableToolBar

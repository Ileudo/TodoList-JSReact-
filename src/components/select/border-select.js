import React, { useState } from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Original design here: https://github.com/siriwatknp/mui-treasury/issues/541

const useBorderSelectStyles = ({ palette }) => ({
  label: {
    marginLeft: '4px',
    color: palette.grey[500],
    '&.Mui-focused': {
      color: palette.grey[500], // to overwrite the default behaviour
    },
  },
  select: {
    minWidth: '200px',
    background: 'white',
    color: palette.grey[700],
    borderColor: palette.grey[300],
    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: '4px',
    paddingLeft: '24px',
    paddingTop: '14px',
    paddingBottom: '15px',
    '&:hover': {
      borderColor: palette.grey[400],
    },
    '&:focus': {
      borderRadius: '4px',
      background: 'white',
      borderColor: blue[200],
    },
  },
  icon: {
    color: palette.grey[500],
    right: 12,
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none',
  },
  iconOpen: {
    transform: 'initial',
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    background: 'white',
    '& li.Mui-selected': {
      fontWeight: 700,
    },
  },
});

const BorderSelect = () => {
  const [val, setVal] = useState(1);

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  const theme = useTheme();
  const borderSelectClasses = useBorderSelectStyles(theme);

  // moves the menu below the select input
  const menuProps = {
    classes: {
      list: borderSelectClasses.list,
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    getContentAnchorEl: null,
  };

  const iconComponent = (props) => {
    return <AccessTimeIcon className={props.className + ' ' + borderSelectClasses.icon} />;
  };

  return (
    <FormControl sx={{ mt: 2 }}>
      <InputLabel className={borderSelectClasses.label} id="inputLabel">
        LABEL
      </InputLabel>
      <Select
        disableUnderline
        classes={{ root: borderSelectClasses.select }}
        labelId="inputLabel"
        IconComponent={iconComponent}
        MenuProps={menuProps}
        value={val}
        onChange={handleChange}
      >
        <MenuItem value={0}>None</MenuItem>
        <MenuItem value={1}>One</MenuItem>
        <MenuItem value={2}>Two</MenuItem>
        <MenuItem value={3}>Three</MenuItem>
      </Select>
    </FormControl>
  );
};

export default BorderSelect;

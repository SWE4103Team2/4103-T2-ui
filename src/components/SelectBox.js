import React from 'react';
import { FormControl, InputLabel, Select } from '@mui/material';

const SelectBox = ({ children, label, ...rest }) => {
  return (
    <FormControl>
      <InputLabel>
        {label}
      </InputLabel>
      <Select label={label} {...rest}>
        {children}
      </Select>
    </FormControl>
  );
};

SelectBox.defaultProps = {
  size: 'small',
  sx: { width: '15rem' }
};

export default SelectBox;
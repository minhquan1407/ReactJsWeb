import { AddCircleOutline, RemoveCircleOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

QuantityFiled.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles({
  root: {},
  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '180px',
  },
});

function QuantityFiled(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;
  const { control, setValue } = form;

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, error } }) => (
          <FormControl error={name && invalid} margin="normal" fullWidth variant="outlined">
            <Typography>{label}</Typography>
            <Box className={classes.box}>
              <IconButton
                onClick={() => setValue(name, Number.parseInt(value) > 0 ? Number.parseInt(value) - 1 : 0)}
              >
                <RemoveCircleOutline />
              </IconButton>
              <OutlinedInput
                id={name}
                error={invalid}
                type="number"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                disabled={disabled}
              />
              <IconButton
                onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}
              >
                {/* name là tên của cái control */}
                <AddCircleOutline />
              </IconButton>
            </Box>
            <FormHelperText error={invalid}>{error?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </div>
  );
}

export default QuantityFiled;

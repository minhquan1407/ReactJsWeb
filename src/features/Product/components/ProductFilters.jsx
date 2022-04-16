import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import FilterByPrice from './filters/FilterByPrice';
import FilterByService from './filters/FilterByService';

ProductFilter.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object.isRequired,
};

function ProductFilter({ filters, onChange }) {
  const handleChange = (values) => {
    if (onChange) onChange(values);
  };
  return (
    <Box>
      <FilterByPrice onChange={handleChange} />
      <FilterByService filters={filters} onChange={handleChange} />
    </Box>
  );
}

export default ProductFilter;

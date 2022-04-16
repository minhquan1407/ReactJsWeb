import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import FilterByCategory from './filters/FilterByCategory';

ProductFiltersCategory.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  category: PropTypes.object,
  handleCategory2: PropTypes.func,
};

function ProductFiltersCategory({ filters, onChange, handleCategory2 }) {
  // const [valueCategory, setValueCategory] = useState({});
  const handleCategoryOnchange = (newCategoryId) => {
    if (!onChange) return;

    const newFilters = {
      ...filters,
      'category.id': newCategoryId,
    };
    onChange(newFilters);
  };
  const handleCategory = (e) => {
    handleCategory2(e);
  };
  return (
    <Box>
      <FilterByCategory onChange={handleCategoryOnchange} handleCategory={handleCategory} />
    </Box>
  );
}

export default ProductFiltersCategory;

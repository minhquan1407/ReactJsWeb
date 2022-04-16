import { Category } from '@mui/icons-material';
import { Box, Chip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import categoryApi from 'api/categoryApi';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 'row wrap',
    alignItems: 'center',

    padding: 0,
    margin: '16px 0',
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      padding: '8px',
    },
  },
}));

const FILTER_LISTT = [
  {
    id: 4,
    getLabel: (category) => category.name,
    isActive: (category) => true,
    isVisible: (category) => category.name,
    isRemovable: true,
    onRemove: (filters, category) => {
      let newCategoryFilter = { ...filters };
      let newCategory = { ...category };
      // delete newCategory.id;
      // delete newCategory.name;
      console.log(newCategory.category.id);
      delete newCategoryFilter.isFreeShip;
      // category = {};
      console.log(newCategoryFilter);
      // newCategoryFilter = {};
      return newCategoryFilter, newCategory;
    },
    inToggle: (category) => {
      const NewCategory = { ...category };
      if (category.name) {
        delete category.name;
      } else {
        category.name = true;
      }
      return NewCategory;
    },
  },
];

FilterViewerCategory.propTypes = {
  onChange: PropTypes.func,
  category: PropTypes.object,
  filters: PropTypes.object,
};
function FilterViewerCategory({ onChange = null, category = {}, filters = {} }) {
  // đây là cách defaul theo kiểu ES6, khỏi làm như c
  const classes = useStyles();

  const visibleFilters = useMemo(() => {
    return FILTER_LISTT.filter((x) => x.isVisible(category));
  }, [category]);
  console.log(visibleFilters);

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(category)}
            color={x.isActive(category) ? 'primary' : 'default'}
            clickable={x.isRemovable}
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;

                    const newCategoryFilter = x.onRemove(filters, category);
                    onChange(newCategoryFilter);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewerCategory;

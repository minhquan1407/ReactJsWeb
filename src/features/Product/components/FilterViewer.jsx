import { Category, ContactsOutlined } from '@mui/icons-material';
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

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao hàng miễn phí',
    isActive: (filters) => filters.isFreeShip, // khi thằng isFreeShip là true
    isVisible: () => true,
    isRemovable: false, // thằng này kh thể xóa đc
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  // Giải thích logic phái trên: đầu tiền tạo newFilters và lấy hết tất cả filters
  // nếu isFreeShip là true thì xóa đi, còn kh thì add nó vào
  // return newFilters sau đó trả về bộ filters mới
  {
    id: 2,
    getLabel: () => 'Có khuyến mãi',
    isActive: () => true,
    //no dính với Visible, kiểu là nó có nó mới show lên, mà show lên thì chắc chắn active
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    inToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) => `Từ ${filters.salePrice_gte}₫ đến ${filters.salePrice_lte}₫`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_lte;
      delete newFilters.salePrice_gte;
      return newFilters;
    },
    inToggle: () => {},
  },
];

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};
function FilterViewer({ filters = {}, onChange = null }) {
  // đây là cách defaul theo kiểu ES6, khỏi làm như c
  const classes = useStyles();
  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);
  console.log(filters);
  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;

                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;

                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;

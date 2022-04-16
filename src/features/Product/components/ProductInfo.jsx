import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { formatPrice } from 'utils/common';
import { makeStyles } from '@mui/styles';

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles(() => ({
  root: {},

  description: {
    margin: '12px 0',
  },
  priceBox: {
    padding: '12px',
    background: '#EEEEEE',
  },
  salePrice: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginRight: '24px',
  },
  originalPrice: {
    textDecoration: 'line-through',
    marginRight: '16px',
  },
}));

function ProductInfo({ product }) {
  const classes = useStyles();
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;
  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" className={classes.description}>
        {shortDescription}
      </Typography>
      <Box className={classes.priceBox}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>
            <Box component="span" className={classes.promotionPercent}>{`-${product.promotionPercent}%`}</Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;

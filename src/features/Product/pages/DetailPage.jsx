import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, LinearProgress, Paper, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductThumbnail from '../components/ProductThumbnail';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail';
import ProductInfo from '../components/ProductInfo';
import AddToCardForm from '../components/AddToCardForm';
import ProductMenu from '../components/ProductMenu';
import ProductDescription from '../components/ProductDescription';
import ProductAdditional from '../components/ProductAdditional';
import ProductReviews from '../components/ProductReviews';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../MiniCart/cartSlice';
DetailPage.propTypes = {};
const useStyles = makeStyles(() => ({
  root: {},

  left: {
    width: '350px',
    padding: '12px',
    borderRight: '1px solid #EEEEEE',
  },

  right: {
    flex: '1 1 0',
    padding: '12px',
  },
  icon: {
    width: '100%',
    color: 'grey.500',
  },
}));

function DetailPage(props) {
  const classes = useStyles();
  const {
    params: { productId },
    url,
  } = useRouteMatch();

  const { product, loading } = useProductDetail(productId);
  const dispatch = useDispatch();
  if (loading) {
    return (
      <Stack className={classes.icon} spacing={2} style={{ position: 'fixed', top: '0', left: '0' }}>
        <LinearProgress color="secondary" />
      </Stack>
    );
  }
  const handleAddToCartSubmit = ({ quantity }) => {
    // console.log('Form values', formValues);
    // khi submit vào thì nó sẽ truyền cái giữ liệu trong thăng form lên thằng cha, thằng cha làm gi kh cần qtam
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    console.log(action);
    dispatch(action);
  };

  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCardForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />

        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>
          <Route exact path={`${url}/additional`} component={ProductAdditional} />
          <Route exact path={`${url}/reviews`} component={ProductReviews} />
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;

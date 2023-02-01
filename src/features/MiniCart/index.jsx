import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import { cartItemsCountSelector, cartTotalSelector } from './selector';
import useDetailCart from './hooks/useDetailCart';
import { useRouteMatch } from 'react-router-dom';
import { Box, Container, Grid, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ThumbnailCart from './ThumbnailCart';

CartFeature.propTypes = {};

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 20,
    padding: '0 4px',
  },
}));
const useStyles = makeStyles(() => ({
  root: {},
  textProduct: {
    display: 'flex',
    paddingLeft: '73px',
    paddingTop: '20px',
  },
  left: {
    width: '800px',
    padding: '5px',
    height: '50px',
    '& > .css-ee20y-MuiPaper-root': {
      height: '50px',
    },
  },
  boxField: {
    display: 'flex',
    lineHeight: '50px',
    paddingLeft: '10px',
    '& > .css-37jdci-MuiTypography-root': {
      marginTop: '5px',
    },
  },
  leftItem: {
    display: 'flex',
    lineHeight: '52px',
    icon: {
      fontSize: '20px',
    },
    '& > .css-1c32n2y-MuiBadge-root': {
      marginLeft: '5px',
      marginTop: '27.5px',
      '& > .css-jcn4dz-MuiBadge-badge': {
        background: 'none',
        fontSize: '15px',
        lineHeight: '52px',
      },
    },
  },
  textField: {
    marginLeft: '118px',
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: '50px',
    alignItems: 'center',
    '& > .css-ahj2mt-MuiTypography-root': {
      margin: '47px',
      color: 'black',
    },
  },
  productList: {
    width: '800px',
    background: '#fff',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    borderRadius: '4px',
    boxShadow: 'none',
    marginTop: '10px',
    height: '150px',
  },
  itemLeft: {
    width: '80px',
    height: '120px',
    '& > .MuiBox-root': {
      lineHeight: '150px',
      margin: '10px 50px',
      paddingTop: '35px',
      width: '100%',
      height: '100%',
    },
  },

  right: {
    flex: '1 1 0',
    padding: '10px',
  },
}));
function CartFeature(props) {
  const classes = useStyles();
  const cartTotal = useSelector(cartTotalSelector);
  const cartItemCount = useSelector(cartItemsCountSelector);
  // const match = useRouteMatch();
  // console.log(match);
  // const {
  //   params: { productId },
  //   url,
  // } = useRouteMatch();

  // const { product, loading } = useDetailCart(productId);
  // if (loading) {
  //   return (
  //     <Stack className={classes.icon} spacing={2} style={{ position: 'fixed', top: '0', left: '0' }}>
  //       <LinearProgress color="secondary" />
  //     </Stack>
  //   );
  // }

  return (
    <Box>
      <Box className={classes.textProduct}>
        <Typography component="h1" variant="h5">
          Giỏ hàng
        </Typography>
      </Box>
      <Container>
        <Grid container>
          <Grid item className={classes.left}>
            <Paper elevation={0} className={classes.boxField}>
              <Box className={classes.leftItem}>
                <Typography variant="span" fontSize="1.2rem" fontWeight="500" lineHeight="50px">
                  Tất cả
                </Typography>
                (
                <Badge
                  badgeContent={cartItemCount > 0 ? cartItemCount : '0'}
                  color="secondary"
                  variant="span"
                  className={classes.icon}
                ></Badge>
                <Typography variant="span" fontSize="15px" marginLeft="10px">
                  sản phẩm
                </Typography>
                )
              </Box>
              <Box className={classes.textField}>
                <Typography>Đơn Giá</Typography>
                <Typography>Số lượng</Typography>
                <Typography>Thành Tiềnnnnnnnnnnnnn</Typography>
              </Box>
              <Typography variant="span">
                <DeleteForeverIcon />
              </Typography>
            </Paper>

            <div elevation={0} className={classes.productList}>
              <div item className={classes.itemLeft}>
                <ThumbnailCart product={{}} className={classes.thumbnail} />
              </div>
            </div>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>nnnnn</Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CartFeature;

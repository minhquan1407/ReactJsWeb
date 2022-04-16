import { Box, Container, Grid, Pagination, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import productAPI from 'api/productApi';
import React, { useEffect, useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductFiltersCategory from '../components/ProductFiltersCategory';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import './index.scss';
import { useHistory, useLocation } from 'react-router-dom';
import FilterViewerCategory from '../components/FilterViewerCategory';

// const useStyles = makeStyles(() => ({
//   root: {},
// }));
// ListPage.propTypes = {};

function ListPage(props) {
  // const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const [category, setCategory] = useState({});
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 10,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);
  const [pagination, setPagination] = useState({
    limit: 10,
    total: 10,
    page: 1,
  });
  // const [filters, setFilters] = useState({
  //   _page: 1,
  //   _limit: 10,
  //   _sort: 'salePrice:ASC',
  // });
  // const [filters, setFilters] = useState({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams.limit) || 10,
  //   _sort: queryParams._sort || 'salePrice:ASC',
  // });

  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [history, filters]);
  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productAPI.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
        console.log({ data, pagination });
      } catch (error) {
        console.log('Failed to fetch product list', error);
      }
      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: page,
    // }));
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleSortChange = (newSortValue) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _sort: newSortValue,
    // }));
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleFiltersChange = (newFilters) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   ...newFilters,
    // }));
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const setNewFilters = (newFilters) => {
    // setFilters(newFilters);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };
  const setCategoryFilters = (newCategory) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newCategory),
    });
  };
  const handleCategory2 = (e) => {
    setCategory(e);
  };
  return (
    <div className="root">
      <div className="banner">
        <div className="banner_bgroud">
          <div className="banner_left">
            <NavLink to="/">
              <div className="banner_button-left">Home </div>
            </NavLink>
          </div>
          {/* <Typography component="h6" variant="span">
            /
          </Typography> */}
          <div className="banner_right">
            <NavLink to="/products">
              <div className="banner_button-right">/ Products</div>
            </NavLink>
          </div>
        </div>
      </div>

      <Container className="product">
        <Grid container spacing={1}>
          <Grid item className="item-left">
            <Paper elevation={1}>
              <ProductFiltersCategory
                filters={queryParams}
                onChange={handleFiltersChange}
                handleCategory2={handleCategory2}
              />
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item className="item-right">
            <Paper elevation={1}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />

              {/* <Box variant="span">
                <FilterViewer filters={queryParams} onChange={setNewFilters} />
                <FilterViewerCategory onChange={setNewFilters} category={category} />
              </Box> */}
              <FilterViewer filters={queryParams} onChange={setNewFilters} />
              <FilterViewerCategory filters={queryParams} onChange={setCategoryFilters} category={category} />

              {loading ? <ProductSkeletonList length={10} /> : <ProductList data={productList} />}

              <Box className="pagination">
                <Pagination
                  variant="outlined"
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ListPage;

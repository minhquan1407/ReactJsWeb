import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

import ListPage from './pages/ListPage';
import NotFound from '../../components/NotFound';
import DetailPage from './pages/DetailPage';
import { Box } from '@mui/material';

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} component={ListPage} exact />
        <Route path={`${match.path}/:productId`} component={DetailPage} />

        <NotFound component={NotFound} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;

import React from 'react';

import { Box } from '@mui/system';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Link } from '@mui/material';

ProductMenu.propTypes = {};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 0,
    listStyleType: 'none',

    '& > li': {
      padding: '16px 32px',
    },

    '& > li > a': {
      color: 'blue',
    },
    '& > li > a.active': {
      color: 'red',
      textDecoration: 'underline',
    },
  },
}));

function ProductMenu(props) {
  const classes = useStyles();
  const { url } = useRouteMatch();
  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={url} exact>
          Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/additional`} exact>
          Additional Information
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/reviews`} exact>
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default ProductMenu;

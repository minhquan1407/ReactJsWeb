import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Close from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Dialog, DialogContent, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import { Box } from '@mui/system';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { cartItemsCountSelector } from 'features/MiniCart/selector';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { links } from './data';
import './header.scss';
import logo from './logo/logo.svg';

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Navbar() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const [open, setOpen] = useState(false);
  const cartItemscount = useSelector(cartItemsCountSelector);
  const [showLinks, setShowLinks] = useState(false);
  const history = useHistory();
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogoutCLick = () => {
    const action = logout();
    dispatch(action);
  };
  const handleCartClick = () => {
    history.push('/cart');
  };
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} className="logo" alt="" />
          {/* <button className="nav-toggle" onClick={toggleLinks}>
            <FaBars />
          </button> */}
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="social-icons">
          <div className="cart">
            <Typography variant="span" component="h4" className="social-cart">
              Cart
            </Typography>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              variant="span"
              className="social-cart"
              onClick={handleCartClick}
            >
              <Badge badgeContent={cartItemscount > 0 ? cartItemscount : '0'} color="secondary">
                <ShoppingCartIcon className="icon-cart" />
              </Badge>
            </IconButton>
          </div>
          <div className="login">
            {!isLoggedIn && (
              <Button
                color="inherit"
                sx={{ fontSize: '20px', textTransform: 'capitalize', marginTop: '2.5px' }}
                onClick={handleClickOpen}
              >
                Login
              </Button>
            )}
            {isLoggedIn && (
              <IconButton color="inherit" onClick={handleUserClick}>
                <AccountCircleIcon />
              </IconButton>
            )}
          </div>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          getcontentanchorel={null}
        >
          <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
          <MenuItem onClick={handleLogoutCLick}>Logout</MenuItem>
        </Menu>

        <Dialog
          disableEscapeKeyDown
          onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
              handleClose(event, reason);
            }
          }}
          open={open}
          className="dialog"
        >
          <IconButton className="closebutton" onClick={handleClose}>
            <Close />
          </IconButton>

          <DialogContent>
            {mode === MODE.REGISTER && (
              <>
                <Register closeDialog={handleClose} />
                <Box textAlign="center">
                  <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                    Already have an account. Login here
                  </Button>
                </Box>
              </>
            )}
            {mode === MODE.LOGIN && (
              <>
                <Login closeDialog={handleClose} />
                <Box textAlign="center">
                  <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                    Already have an account. Login here
                  </Button>
                </Box>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
}

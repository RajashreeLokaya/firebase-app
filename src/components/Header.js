import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contex/AuthContext';

const Header = () => {
    const { currentUser } = useAuth();
    const { logout } = useAuth();

    const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const navigateTo = (route) => {
    handleClose();
    navigate(route);
  };

  return (
    <AppBar position="static" className="app-bar">
      <Toolbar className="toolbar">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="app-title">
          My App
        </Typography>

        <Button color="inherit" onClick={() => navigateTo('/landingPage')} className="nav-button">
          Home
        </Button>
       
         {/* <Button color="inherit" onClick={() => navigateTo('/todoPage')} className="nav-button">
          Todo
        </Button>  */}
        <Button color="inherit" onClick={() => navigateTo('/uploadPage')} className="nav-button">
        Photo Gallery        
        </Button>

        <div>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            className="account-icon"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Welcome, {
  currentUser.displayName
    ? currentUser.displayName
    : (currentUser.email
      ? currentUser.email // Extract the part before '@'
      : 'User'
    )
}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

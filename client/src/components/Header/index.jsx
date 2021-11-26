import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import './Header.css';
import { Container, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import userApi from 'api/userApi';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '24ch',
      },
    },
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});

  const photoURL = useSelector((state) => state.userAuth.photoURL);
  const userId = useSelector((state) => state.userAuth.id);
  const fullName = useSelector((state) => state.userAuth.fullName);

  useEffect(() => {
    try {
      const getUser = async () => {
        const response = await userApi.getUserProfile({
          userFirebaseId: userId,
        });
        setProfile(response);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsLoggedIn(localStorage.getItem('account'));
    }
  }, [isLoggedIn]);

  const onPressLogOut = async () => {
    await auth.signOut().then(() => {
      localStorage.clear();
      window.location = '/';
      setAnchorEl(null);
    });
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <Link to={`/profile/${userId}`} className='linkProfile'>
          <Stack direction='row' spacing={2}>
            <Avatar sx={{ mt: 0.7 }} src={photoURL} alt={fullName} />
            <Stack direction='column'>
              <Typography variant='h6'>{profile.fullName}</Typography>
              <Typography variant='body1'>View Profile</Typography>
            </Stack>
          </Stack>
          <Divider />
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to={`/recipe/create`} className='linkProfile'>
          <Typography>Create new Recipe 😋</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={onPressLogOut}>
        Logout <LogoutIcon className='logout_icon' />
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' className='header_style'>
        <Container maxWidth='lg'>
          <Toolbar>
            <Link to='/' className='linkHeader'>
              <Typography variant='h6' sx={{ fontSize: 25 }}>
                CooKit 🍱
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1 }} />

            {isLoggedIn ? (
              <>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder='Search…'
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <IconButton
                    size='large'
                    edge='end'
                    aria-label='account of current user'
                    aria-controls={menuId}
                    aria-haspopup='true'
                    onClick={handleProfileMenuOpen}
                    color='inherit'>
                    <Avatar src={photoURL} alt={fullName} />
                  </IconButton>
                </Box>
              </>
            ) : (
              <>
                <Button variant='contain'>
                  <Link to='/user/login' className='linkHeader'>
                    Log in
                  </Link>
                </Button>

                <Button variant='contain'>
                  <Link to='/user/register' className='linkHeader'>
                    Register
                  </Link>
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

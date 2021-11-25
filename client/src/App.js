import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './features/Auth';
import Register from './features/Auth';
import Home from './features/Home';
import NotFound from './components/NotFound';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { userProfile, getUserProfile } from 'app/authSlice';
import { auth } from './firebase';
import Profile from './features/Profile';
import Recipe from './features/Recipe';
import userApi from './api/userApi';

function App() {
  const dispatch = useDispatch();

  const uid = useSelector((state) => state.userAuth.id);
  const [isExistProfile, setIsExistProfile] = useState(true);

  useEffect(() => {
    try {
      const checkProfile = async () => {
        if (!uid) return;
        const response = await userApi.getUserProfile({
          userFirebaseId: uid,
        });
        if (response.message === 'User not found') {
          setIsExistProfile(false);
        }
      };
      checkProfile();
    } catch (error) {
      console.log(error);
    }
  }, [uid]);

  // Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log('User is not logged in');
        return;
      }
      try {
        const actionResult = dispatch(
          userProfile({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            isLoggedIn: true,
          })
        );
        const currentUser = unwrapResult(actionResult);
        console.log('Logged in user: ', currentUser);
        localStorage.setItem('account', JSON.stringify(currentUser));
      } catch (error) {
        console.log('Failed to login ', error);
      }
    });

    return () => unregisterAuthObserver();
  }, [dispatch]);

  useEffect(() => {
    const getUserProfileThunk = () => {
      try {
        if (!uid) return;
        dispatch(getUserProfile(uid));
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfileThunk();
  }, [uid, dispatch]);
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/user' component={Login} />
          {!isExistProfile && <Redirect to='/user/register' />}
          <Route path='/user/register' component={Register} />
          <Route>
            <CssBaseline />
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/profile' component={Profile} />
              <Route path='/recipe' component={Recipe} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

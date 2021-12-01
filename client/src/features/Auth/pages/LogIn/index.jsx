import React from 'react';
import firebase from '../../../../firebase';
import { auth } from '../../../../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import LoginForm from 'features/Auth/components/LoginForm';
import { useHistory } from 'react-router';
import { Divider, Typography, Container } from '@mui/material';

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

export default function LoginPage() {
  const history = useHistory();

  const onPressLogin = async (values) => {
    try {
      await auth
        .signInWithEmailAndPassword(values.email, values.password)
        .then((user) => {
          console.log(user);
        });

      window.location.pathname = '/';
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password!');
      }
      if (errorCode === 'auth/user-not-found') {
        alert('User not found!');
      } else {
        alert(errorMessage);
      }
    }
  };
  return (
    <>
      <LoginForm onPressLogin={onPressLogin} />
      <Container maxWidth='xs'>
        <Divider variant='middle'>
          <Typography variant='overline'>or</Typography>
        </Divider>
      </Container>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </>
  );
}

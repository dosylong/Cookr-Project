import React from 'react';
import firebase from '../../../../firebase';
import { auth } from '../../../../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './LoginPage.css';
import LoginForm from 'features/Auth/components/LoginForm';
import { useHistory } from 'react-router';

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

      history.push('/');
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
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={auth}
        className='login_google_button'
      />
    </>
  );
}

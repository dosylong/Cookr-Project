import firebase from '../../../../firebase';
import { auth } from '../../../../firebase';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './LoginPage.css'
import LogInForm from 'features/Auth/components/LoginForm';


const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
}

export default function LoginPage() {
  return (
    <>
    <LogInForm />
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} className="login_google_button" />  
    </>
  )
}

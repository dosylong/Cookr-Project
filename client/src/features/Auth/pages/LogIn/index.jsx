import firebase from '../../../../firebase';
import { auth } from '../../../../firebase';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
}

export default function LoginPage() {
  return (
    <>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        
    </>
  )
}

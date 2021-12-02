import React, { useState, useEffect } from 'react';
import RegisterGoogleForm from 'features/Auth/components/RegisterGoogleForm';
import userApi from 'api/userApi';
import { useSelector } from 'react-redux';

export default function RegisterGooglePage() {
  const uid = useSelector((state) => state.userAuth.id);
  const email = useSelector((state) => state.userAuth.email);
  const photoURL = useSelector((state) => state.userAuth.photoURL);

  const onPressRegisterGoogleForm = async (values) => {
    try {
      const response = await userApi.createUserProfile({
        ...values,
        userFirebaseId: uid,
        email,
        photoURL,
      });
      console.log('Register result: ', response);
      window.location.pathname = '/';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RegisterGoogleForm onPressRegisterGoogleForm={onPressRegisterGoogleForm} />
  );
}

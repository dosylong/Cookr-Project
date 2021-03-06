import React, { useEffect, useState } from 'react';
import RegisterForm from 'features/Auth/components/RegisterForm';
import { auth } from '../../../../firebase';
import userApi from 'api/userApi';
import { useSelector } from 'react-redux';

export default function RegisterPage() {
  const uid = useSelector((state) => state.userAuth.id);
  const email = useSelector((state) => state.userAuth.email);

  const [formData, setFormData] = useState({});

  const onPressRegister = async (values) => {
    try {
      await auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((user) => {
          console.log(user);
        });

      await auth.currentUser
        .updateProfile({
          displayName: values.fullName,
        })
        .then(() => {
          console.log('Created fullName successfully!');
        })
        .catch((error) => {
          console.log(error);
        });

      setFormData(values);
      window.location.pathname = '/';
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!uid || !email || !Object.keys(formData).length) return;
    const createUserProfile = async () => {
      try {
        const response = await userApi.createUserProfile({
          ...formData,
          userFirebaseId: uid,
          email,
        });
        console.log('Register result: ', response);
      } catch (error) {
        console.log(error);
      }
    };
    createUserProfile();
  }, [uid, email, formData]);

  return <RegisterForm onPressRegister={onPressRegister} />;
}

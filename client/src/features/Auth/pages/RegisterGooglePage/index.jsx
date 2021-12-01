import React, { useState } from 'react';
import RegisterGoogleForm from 'features/Auth/components/RegisterGoogleForm';
import userApi from 'api/userApi';
import { useSelector } from 'react-redux';

export default function RegisterGooglePage() {
  const uid = useSelector((state) => state.userAuth.id);
  const email = useSelector((state) => state.userAuth.email);

  const [formData, setFormData] = useState({});

  const onPressRegisterGoogleForm = async (values) => {
    if (!uid || !email || !Object.keys(formData).length) return;

    try {
      const response = await userApi.createUserProfile({
        ...formData,
        userFirebaseId: uid,
        email,
      });
      console.log('Register result: ', response);
      setFormData(values);
      window.location.pathname = '/';
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (!uid || !email || !fullName || !Object.keys(formData).length) return;
  //   const onPressRegisterGoogleForm = async () => {
  //     try {
  //       const response = await userApi.createUserProfile({
  //         ...formData,
  //         userFirebaseId: uid,
  //         email,
  //         fullName,
  //       });
  //       console.log('Register result: ', response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   onPressRegisterGoogleForm();
  // }, [uid, email, fullName, formData]);

  return (
    <RegisterGoogleForm onPressRegisterGoogleForm={onPressRegisterGoogleForm} />
  );
}

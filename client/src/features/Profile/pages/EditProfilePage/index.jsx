import EditProfileForm from 'features/Profile/components/EditProfile';
import React from 'react';
import userApi from 'api/userApi';
// import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function EditProfilePage() {
  const userId = useSelector((state) => state.userAuth.id);
  // const history = useHistory();

  const onClickEditProfile = (values) => {
    try {
      const editProfile = async () => {
        const response = await userApi.updateUserProfile({
          ...values,
          userFirebaseId: userId,
        });
        console.log(response);
      };
      editProfile();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (!photoURL) return;
  //   const updatePhoto = async () => {
  //     const response = await userApi.updateUserProfile({
  //       photoURL,
  //       userFirebaseId: userId,
  //     });
  //     console.log(response);
  //   };
  //   updatePhoto();
  // }, [photoURL, userId]);
  return (
    <div>
      <EditProfileForm
        onClickEditProfile={onClickEditProfile}
        userId={userId}
      />
    </div>
  );
}

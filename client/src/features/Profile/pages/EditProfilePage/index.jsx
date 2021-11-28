import EditProfileForm from 'features/Profile/components/EditProfile';
import React, { useState, useEffect } from 'react';
import userApi from 'api/userApi';
import { useSelector } from 'react-redux';
import { storage, auth } from '../../../../firebase';

export default function EditProfilePage() {
  const userId = useSelector((state) => state.userAuth.id);
  const email = useSelector((state) => state.userAuth.email);
  // const photoURL = useSelector((state) => state.userAuth.photoURL);

  const [imgURL, setImgURL] = useState('');
  const [progress, setProgress] = useState(0);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    try {
      const getProfile = async () => {
        const response = await userApi.getUserProfile({
          userFirebaseId: userId,
        });
        setProfile(response);
      };
      getProfile();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    setProgress((prevProgress) =>
      prevProgress >= 100 ? 10 : prevProgress + 10
    );
  }, []);

  const updateDisplayName = (values) => {
    const currentUser = auth.currentUser;
    currentUser
      .updateProfile({
        displayName: values.fullName,
      })
      .then(() => {
        console.log('Updated fullName successfully!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateAvatarUrl = async (url) => {
    const response = await userApi.updateUserProfileAvatar({
      photoURL: url,
      userFirebaseId: userId,
    });
    console.log(response);
  };

  const uploadAvatar = async (file) => {
    const uploadTask = storage
      .ref(`avatars/${email}/avatar/${file.name}`)
      .put(file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`avatars/${email}/avatar/`)
          .child(file.name)
          .getDownloadURL()
          .then(async (url) => {
            setImgURL(url);
            updateAvatarUrl(url);
            updateAvatar(url);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  const updateAvatar = async (url) => {
    const currentUser = auth.currentUser;
    currentUser
      .updateProfile({
        photoURL: url,
      })
      .then(() => {
        console.log('Updated avatar successfully!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
  return (
    <div>
      <EditProfileForm
        onClickEditProfile={onClickEditProfile}
        userId={userId}
        imgURL={imgURL}
        // photoURL={photoURL}
        progress={progress}
        uploadAvatar={uploadAvatar}
        profile={profile}
        updateDisplayName={updateDisplayName}
      />
    </div>
  );
}

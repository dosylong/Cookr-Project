import React, { useEffect, useState } from 'react';
import userApi from 'api/userApi';
import ProfileInfo from 'features/Profile/components/ProfileInfo';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const { userId } = useParams();
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

  return (
    <div>
      <ProfileInfo profile={profile} userId={userId} />
    </div>
  );
}

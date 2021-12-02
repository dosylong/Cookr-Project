import React, { useEffect, useState } from 'react';
import userApi from 'api/userApi';
import ProfileInfo from 'features/Profile/components/ProfileInfo';
import { useParams } from 'react-router-dom';
import dishApi from 'api/dishApi';
import { Container, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import DishCard from 'features/Dish/components/DishCard';

export default function ProfilePage() {
  const { userId } = useParams();
  const [profile, setProfile] = useState({});
  const [myDish, setMyDish] = useState([]);

  const uid = useSelector((state) => state.userAuth.id);

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
    const getMyDishInDb = async () => {
      try {
        const response = await dishApi.getMyDish({
          authorId: userId,
        });
        setMyDish(response);
      } catch (error) {
        console.log(error);
      }
    };
    getMyDishInDb();
  }, [userId]);

  return (
    <div>
      <ProfileInfo profile={profile} userId={userId} />

      {userId === uid ? (
        <div>
          <Container maxWidth='lg'>
            <Typography variant='h4' align='center'>
              My latest recipe
            </Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}>
              {myDish?.map((dish) => (
                <Grid item xs={2} sm={4} md={3.5} key={dish.id}>
                  <DishCard dish={dish} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      ) : (
        <div>
          <Container maxWidth='lg'>
            <Typography variant='h4' align='center'>
              {profile.fullName}'s latest recipe
            </Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}>
              {myDish?.map((dish) => (
                <Grid item xs={2} sm={4} md={3.5} key={dish.id}>
                  <DishCard dish={dish} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
}

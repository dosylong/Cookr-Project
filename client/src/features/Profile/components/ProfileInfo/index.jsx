import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import './ProfileInfo.css';
import Skeleton from '@mui/material/Skeleton';

ProfileInfo.propTypes = {
  profile: PropTypes.object,
};
ProfileInfo.defaultProps = {
  profile: {},
};

function ProfileInfo(props) {
  const { profile, userId } = props;
  const history = useHistory();
  const match = useRouteMatch();
  // const photoURL = useSelector((state) => state.userAuth.photoURL);

  const uid = useSelector((state) => state.userAuth.id);
  const isOwner = uid === userId;

  const onClickEditProfile = () => {
    history.push(`${match.url}/edit`);
  };

  const onClickCreateRecipe = () => {
    console.log('create recipe');
  };
  return (
    <div>
      <CssBaseline />
      <Container maxWidth='lg'>
        <div className='profile-info-container'>
          <div className='profile-info-avatar'>
            {profile.photoURL ? (
              <img
                alt={profile.fullName}
                src={profile.photoURL}
                className='profile-info-avatar-img'
              />
            ) : (
              <Skeleton variant='circular' width={180} height={180} />
            )}
          </div>

          <div className='profile-info-name'>{profile.fullName}</div>

          <div className='profile-info-bio'>{profile.bio}</div>
        </div>

        {isOwner && (
          <div className='buttonContainer'>
            <Button
              variant='contained'
              color='primary'
              onClick={onClickCreateRecipe}>
              Create new Recipe
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={onClickEditProfile}>
              Edit Profile
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

//       {/* <Typography variant='h1'>Profile</Typography>
//       <Avatar alt={profile.fullName} src={profile.photoURL} />
//       <Typography variant='h3'>Full Name: {profile.fullName}</Typography>
//       <Typography variant='h3'>Username: {profile.username}</Typography>
//       <Typography variant='h3'>Email: {profile.email}</Typography>
//       <Typography variant='h3'>Bio: {profile.bio}</Typography> */}
//       {isOwner ? (
//         <Button onClick={onClickEditProfile}>Edit profile</Button>
//       ) : null}
//     </div>
//   );
// }

export default ProfileInfo;

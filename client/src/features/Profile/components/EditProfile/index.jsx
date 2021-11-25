import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import './EditProfile.css';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import userApi from 'api/userApi';
import { styled } from '@mui/material/styles';
import { storage, auth } from '../../../../firebase';
import { useSelector } from 'react-redux';
import ProgressBar from 'components/ProgressBar';

EditProfileForm.propTypes = {
  onClickEditProfile: PropTypes.func,
};
EditProfileForm.defaultProps = {
  onClickEditProfile: null,
};

const Input = styled('input')({
  display: 'none',
});

const theme = createTheme();

export default function EditProfileForm(props) {
  const { onClickEditProfile } = props;
  const history = useHistory();
  const [profile, setProfile] = useState({});
  const [imgURL, setImgURL] = useState('');
  const [progress, setProgress] = useState(0);

  const email = useSelector((state) => state.userAuth.email);
  const id = useSelector((state) => state.userAuth.id);

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

  const onClickBack = () => {
    history.goBack();
  };

  const updateAvatarUrl = async (url) => {
    const response = await userApi.updateUserProfileAvatar({
      photoURL: url,
      userFirebaseId: id,
    });
    console.log('upload URL DB', response);
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

  const handleEdit = (values) => {
    onClickEditProfile(values);
    updateDisplayName(values);
  };

  useEffect(() => {
    try {
      const getProfile = async () => {
        const response = await userApi.getUserProfile({
          userFirebaseId: id,
        });
        setProfile(response);
      };
      getProfile();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const initialValues = {
    email: profile.email,
    username: profile.username,
    fullName: profile.fullName,
    bio: profile.bio,
  };

  const editProfileSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please input valid email!')
      .required('Email is required!'),
    username: yup
      .string()
      .min(2, 'Username too short!')
      .max(50, 'Username too long!')
      .required('Username is required!'),
    fullName: yup
      .string()
      .min(2, 'Full Name too short!')
      .max(100, 'Full Name too long!')
      .required('Full Name is required!'),
    bio: yup.string().required('Bio is required!'),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography component='h1' variant='h5'>
            Edit Profile
          </Typography>
          {Object.keys(profile).length > 0 && (
            <Formik
              initialValues={initialValues}
              validationSchema={editProfileSchema}
              onSubmit={(values) => handleEdit(values)}>
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <Form className='form'>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        error={errors.email && touched.email ? true : null}
                        helperText={errors.email}
                        onChange={handleChange}
                        value={values.email}
                        required
                        fullWidth
                        id='email'
                        label='Email'
                        name='email'
                        disabled
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        error={
                          errors.username && touched.username ? true : null
                        }
                        helperText={errors.username}
                        onChange={handleChange}
                        value={values.username}
                        required
                        fullWidth
                        id='username'
                        label='Username'
                        name='username'
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={
                          errors.fullName && touched.fullName ? true : null
                        }
                        helperText={errors.fullName}
                        onChange={handleChange}
                        value={values.fullName}
                        required
                        fullWidth
                        id='fullName'
                        label='Full Name'
                        name='fullName'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={errors.bio && touched.bio ? true : null}
                        helperText={errors.bio}
                        onChange={handleChange}
                        value={values.bio}
                        required
                        fullWidth
                        id='bio'
                        label='Bio'
                        name='bio'
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type='submit'
                    onClick={handleSubmit}
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}>
                    Edit Profile
                  </Button>

                  <label htmlFor='contained-button-file'>
                    <Input
                      accept='image/*'
                      id='contained-button-file'
                      type='file'
                      onChange={(e) => uploadAvatar(e.target.files[0])}
                    />
                    <Button variant='contained' component='span' sx={{ mt: 3 }}>
                      Upload Avatar
                    </Button>
                    {imgURL ? (
                      <Box sx={{ width: '100%' }}>
                        <ProgressBar value={progress} progress={progress} />
                      </Box>
                    ) : null}
                  </label>
                  <img src={imgURL} alt={values.fullName} />

                  <Grid container justifyContent='flex-start'>
                    <Grid item>
                      <Button onClick={onClickBack}>
                        Back to Profile Page
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

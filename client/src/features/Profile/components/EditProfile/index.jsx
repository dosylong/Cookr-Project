import React from 'react';
import { Typography, Button, Avatar } from '@mui/material';
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
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import ProgressBar from 'components/ProgressBar';
import { useSelector } from 'react-redux';

EditProfileForm.propTypes = {
  onClickEditProfile: PropTypes.func,
  updateDisplayName: PropTypes.func,
  uploadAvatar: PropTypes.func,
  profile: PropTypes.object,
  imgURL: PropTypes.string,
  progress: PropTypes.number,
};
EditProfileForm.defaultProps = {
  onClickEditProfile: null,
  updateDisplayName: null,
  uploadAvatar: null,
  profile: {},
  imgURL: '',
  progress: 0,
};

const Input = styled('input')({
  display: 'none',
});

const theme = createTheme();

export default function EditProfileForm(props) {
  const {
    onClickEditProfile,
    updateDisplayName,
    uploadAvatar,
    profile,
    imgURL,
    // photoURL,
    progress,
  } = props;

  const history = useHistory();

  const userId = useSelector((state) => state.userAuth.id);

  const onClickBack = () => {
    history.goBack();
  };

  const handleEdit = (values) => {
    onClickEditProfile(values);
    updateDisplayName(values);
    window.location.pathname = `/profile/${userId}`;
  };

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
              onSubmit={async (values) => {
                await new Promise((res) => {
                  setTimeout(res, 1800);
                });
                handleEdit(values);
              }}>
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <Form className='form'>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Avatar
                        src={imgURL}
                        sx={{
                          margin: 0,
                          padding: 0,
                          objectFit: 'cover',
                          justifyContent: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          width: 180,
                          height: 180,
                          ml: 13,
                        }}
                      />

                      <label htmlFor='contained-button-file'>
                        <Input
                          accept='image/*'
                          id='contained-button-file'
                          type='file'
                          onChange={(e) => uploadAvatar(e.target.files[0])}
                        />
                        <Button
                          disabled={isSubmitting}
                          variant='contained'
                          component='span'
                          className='uploadAvatarButton'
                          sx={{
                            mt: 2,
                            backgroundColor: '#2a9d8f',
                          }}>
                          Upload New Avatar
                        </Button>
                        {imgURL ? (
                          <Box sx={{ width: '100%' }}>
                            <ProgressBar value={progress} progress={progress} />
                          </Box>
                        ) : null}
                      </label>
                    </Grid>

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
                    disabled={isSubmitting}
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                    startIcon={
                      isSubmitting ? <CircularProgress size={24} /> : null
                    }>
                    {isSubmitting ? 'Saving...' : 'Edit Profile'}
                  </Button>

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

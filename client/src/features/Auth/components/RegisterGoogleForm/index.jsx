import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import './RegisterGoogleForm.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

RegisterGoogleForm.propTypes = {
  onPressRegisterGoogleForm: PropTypes.func,
};
RegisterGoogleForm.defaultProps = {
  onPressRegisterGoogleForm: null,
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default function RegisterGoogleForm(props) {
  const { onPressRegisterGoogleForm } = props;

  const email = useSelector((state) => state.userAuth.email);
  const fullName = useSelector((state) => state.userAuth.fullName);

  const handleRegister = (values) => {
    onPressRegisterGoogleForm(values);
  };

  const initialValues = {
    email: email,
    username: '',
    fullName: fullName,
    bio: '',
  };

  const registerSchema = yup.object().shape({
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={(values) => {
              handleRegister(values);
              return new Promise((res) => {
                setTimeout(() => {
                  res();
                  window.location.pathname = '/';
                }, 2000);
              });
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
                      disabled={email ? true : false}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      error={errors.fullName && touched.fullName ? true : null}
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
                      error={errors.username && touched.username ? true : null}
                      helperText={errors.username}
                      onChange={handleChange}
                      value={values.username}
                      required
                      fullWidth
                      id='username'
                      label='Username'
                      name='username'
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
                  disabled={isSubmitting}
                  type='submit'
                  onClick={handleSubmit}
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  startIcon={
                    isSubmitting ? <CircularProgress size={24} /> : null
                  }>
                  {isSubmitting ? 'Signing up...' : 'Sign up'}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

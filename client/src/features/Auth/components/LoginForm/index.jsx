import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import './LoginForm.css';
import { Container } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';

const theme = createTheme();

LoginForm.propTypes = {
  onPressLogin: PropTypes.func,
};
LoginForm.defaultProps = {
  onPressLogin: null,
};

export default function LoginForm(props) {
  // const history = useHistory();
  const { onPressLogin } = props;

  // const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     history.push('/');
  //     console.log('isLoggedIn:', isLoggedIn);
  //   }
  // }, [isLoggedIn, history]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(showPassword ? false : true);
  };

  const initialValues = {
    email: '',
    password: '',
    showPassword: false,
  };

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please input valid email!')
      .required('Email is required!'),
    password: yup.string().required('Password is required!'),
  });

  const handleLogin = (values) => {
    onPressLogin(values);
  };

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
            Sign in
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              handleLogin(values);
              return new Promise((res) => {
                setTimeout(res, 2000);
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
                      value={values.email}
                      onChange={handleChange}
                      required
                      fullWidth
                      id='email'
                      label='Email'
                      name='email'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errors.password && touched.password ? true : null}
                      helperText={errors.password}
                      value={values.password}
                      onChange={handleChange}
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}>
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value='remember' color='primary' />}
                      label='Remember me'
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
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to='/user/register'>
                      <Typography>Don't have an account? Sign Up</Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

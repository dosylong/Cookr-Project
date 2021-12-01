import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  InputAdornment,
  CircularProgress,
  CssBaseline,
  Stack,
  TextField,
  Box,
  Container,
} from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import './CreateDishForm.css';
import { useHistory } from 'react-router-dom';

CreateDishForm.propTypes = {
  onCreateDish: PropTypes.func,
};

CreateDishForm.defaultProps = {
  onCreateDish: null,
};

const Input = styled('input')({
  display: 'none',
});

export default function CreateDishForm(props) {
  const history = useHistory();
  const { onCreateDish } = props;

  const initialValues = {
    name: '',
    description: '',
    difficulty: '',
    ingredients: [
      {
        name: '',
      },
    ],
    prepTime: '',
    cookTime: '',
  };

  const handleCreateDish = (values) => {
    onCreateDish(values);
    window.location.pathname = '/';
  };

  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography variant='h3'>Create Dish Recipe</Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            await new Promise((res) => {
              setTimeout(res, 1800);
            });
            handleCreateDish(values);
          }}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <Form className='createDishForm'>
              <Stack
                component='form'
                sx={{
                  width: '75ch',
                }}
                spacing={2}
                noValidate
                autoComplete='off'>
                <TextField
                  label='Name'
                  variant='outlined'
                  id='name'
                  onChange={handleChange}
                />
                <TextField
                  label='Description'
                  multiline
                  rows={4}
                  id='description'
                  onChange={handleChange}
                />
                <TextField
                  id='difficulty'
                  label='Difficulty'
                  onChange={handleChange}
                />
                <TextField
                  id='prepTime'
                  label='Preparation Time'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>mins</InputAdornment>
                    ),
                  }}
                  onChange={handleChange}
                />
                <TextField
                  id='cookTime'
                  label='Cooking Time'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>mins</InputAdornment>
                    ),
                  }}
                  onChange={handleChange}
                />
                <FieldArray
                  name='ingredients'
                  render={(arrayHelpers) => (
                    <div>
                      {values.ingredients &&
                        values.ingredients.length > 0 &&
                        values.ingredients.map((ingredient, index) => (
                          <Stack
                            key={index}
                            direction='row'
                            spacing={2}
                            sx={{ mt: 2 }}>
                            <TextField
                              id='ingredients'
                              name={`ingredients[${index}].name`}
                              value={ingredient.name}
                              label='Ingredient Name'
                              onChange={handleChange}
                            />
                            <Stack direction='row' spacing={2}>
                              {values.ingredients.length > 1 && (
                                <Button
                                  onClick={() => arrayHelpers.remove(index)}>
                                  -
                                </Button>
                              )}
                              <Button
                                onClick={() =>
                                  arrayHelpers.push({
                                    name: '',
                                  })
                                }>
                                +
                              </Button>
                            </Stack>
                          </Stack>
                        ))}
                    </div>
                  )}
                />
              </Stack>
              <Container maxWidth='xs'>
                <Button
                  disabled={isSubmitting}
                  type='submit'
                  fullWidth
                  onClick={handleSubmit}
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  startIcon={
                    isSubmitting ? <CircularProgress size={24} /> : null
                  }>
                  {isSubmitting ? 'Saving...' : 'Save Recipe'}
                </Button>
              </Container>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}

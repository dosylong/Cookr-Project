import React from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Container from '@mui/material/Container';
import { Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import './CreateRecipeForm.css';

RecipeForm.propTypes = {
  onSubmitRecipe: PropTypes.func,
  categories: PropTypes.array,
};

RecipeForm.defaultProps = {
  onSubmitRecipe: null,
  categories: [],
};

const Input = styled('input')({
  display: 'none',
});

const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'blockQuote',
    '|',
    'undo',
    'redo',
  ],
};

export default function RecipeForm(props) {
  const { onSubmitRecipe, categories } = props;

  const initialValues = {
    ingredients: [
      {
        description: '',
      },
    ],
    title: '',
    description: '',
    name: '',
    content: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    coverImage: '',
    // categories: [''],
  };

  const createRecipeSchema = yup.object().shape({
    ingredients: yup.array().of(
      yup.object().shape({
        description: yup.string().required('Ingredient is required!'),
      })
    ),
    name: yup.string().required('Name is required!'),
    content: yup.string().required('Content is required!'),
    prepTime: yup.string().required('Prepare Time is required!'),
    cookTime: yup.string().required('Cook Time is required!'),
    servings: yup.string().required('Servings is required!'),
    // categories: yup.string().required('Category is required!'),
  });

  const handleCreateRecipe = (values) => {
    onSubmitRecipe(values);
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
        <Typography variant='h3'>Create Recipe</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={createRecipeSchema}
          onSubmit={(values) => {
            handleCreateRecipe(values);
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
            <Form className='formRecipe'>
              <Grid container spacing={2}>
                <Container maxWidth='xs' sx={{ mt: 5 }}>
                  <FieldArray name='ingredients'>
                    {(arrayHelpers) => (
                      <Stack>
                        {values.ingredients.map((ingredient, index) => (
                          <Stack key={index} direction='row' sx={{ mb: 2 }}>
                            <TextField
                              id='ingredients'
                              label='Ingredient'
                              name={`ingredients.${index}.description`}
                              value={ingredient.description}
                              onChange={handleChange}
                              required
                              fullWidth
                            />
                            <Stack direction='row'>
                              {values.ingredients.length > 1 && (
                                <IconButton
                                  disabled={isSubmitting}
                                  size='small'
                                  onClick={() => arrayHelpers.remove(index)}
                                  sx={{
                                    color: 'green',
                                  }}>
                                  <RemoveIcon />
                                </IconButton>
                              )}

                              <IconButton
                                disabled={isSubmitting}
                                onClick={() =>
                                  arrayHelpers.push({
                                    description: '',
                                  })
                                }
                                sx={{
                                  color: 'green',
                                }}>
                                <AddIcon />
                              </IconButton>
                            </Stack>
                          </Stack>
                        ))}
                      </Stack>
                    )}
                  </FieldArray>
                  <Grid item>
                    {typeof errors.ingredients === 'string' ? (
                      <Typography color='error'>
                        {errors.ingredients}
                      </Typography>
                    ) : null}
                  </Grid>

                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <TextField
                      error={
                        errors.description && touched.description ? true : null
                      }
                      helperText={errors.description}
                      onChange={handleChange}
                      value={values.description}
                      required
                      fullWidth
                      id='description'
                      label='Description'
                      placeholder='Description about this recipe...'
                      name='description'
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      error={errors.name && touched.name ? true : null}
                      helperText={errors.name}
                      onChange={handleChange}
                      value={values.name}
                      required
                      fullWidth
                      id='name'
                      label='Recipe Name'
                      placeholder='Name of this recipe...'
                      name='name'
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      error={errors.prepTime && touched.prepTime ? true : null}
                      helperText={errors.prepTime}
                      onChange={handleChange}
                      value={values.prepTime}
                      required
                      fullWidth
                      id='prepTime'
                      label='Prepare Time'
                      placeholder='Time to prepare this recipe...'
                      name='prepTime'
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      error={errors.cookTime && touched.cookTime ? true : null}
                      helperText={errors.cookTime}
                      onChange={handleChange}
                      value={values.cookTime}
                      required
                      fullWidth
                      id='cookTime'
                      label='Cook Time'
                      placeholder='Time to cook this recipe...'
                      name='cookTime'
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      error={errors.servings && touched.servings ? true : null}
                      helperText={errors.servings}
                      onChange={handleChange}
                      value={values.servings}
                      required
                      fullWidth
                      id='servings'
                      label='Servings'
                      placeholder='This recipe will serves for...'
                      name='servings'
                    />
                  </Grid>

                  {/* <Grid item xs={12} sx={{ mt: 2 }}>
                    <FormControl
                      sx={{ minWidth: 150 }}
                      error={
                        errors.categories && touched.categories ? true : null
                      }>
                      <InputLabel id='demo-simple-select-helper-label'>
                        Category
                      </InputLabel>
                      <Select
                        id='categories'
                        value={categories}
                        label='Category'
                        onChange={handleChange}>
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category}>
                            {category.description}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.categories}</FormHelperText>
                    </FormControl>
                  </Grid> */}
                  <label htmlFor='contained-button-file'>
                    <Input
                      accept='image/*'
                      id='contained-button-file'
                      type='file'
                      multiple
                      onChange={(e) => e.target.files[0]}
                    />
                    <Button
                      disabled={isSubmitting}
                      variant='contained'
                      component='span'
                      sx={{ mt: 3 }}>
                      Upload Recipe Image
                    </Button>
                    {/* {imgURL ? (
                        <Box sx={{ width: '100%' }}>
                          <ProgressBar value={progress} progress={progress} />
                        </Box>
                      ) : null} */}
                  </label>
                </Container>
                <Grid item xs={12}>
                  <Container maxWidth='md'>
                    <CKEditor
                      editor={ClassicEditor}
                      config={editorConfiguration}
                      data={values.content}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        handleChange({
                          target: {
                            name: 'content',
                            value: data,
                          },
                        });
                      }}
                    />

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
                  </Container>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}

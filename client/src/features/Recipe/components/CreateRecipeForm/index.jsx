import React from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Container from '@mui/material/Container';
import { Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './CreateRecipeForm.css';

RecipeForm.propTypes = {
  onSubmitRecipe: PropTypes.func,
};

RecipeForm.defaultProps = {
  onSubmitRecipe: null,
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
  const { onSubmitRecipe } = props;
  const initialValues = {
    ingredients: [''],
    title: '',
    description: '',
    name: '',
    content: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    coverImage: '',
  };

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
        <Typography component='h1' variant='h4'>
          Create Recipe
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleCreateRecipe(values)}>
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <Form className='formEditor'>
              <Container maxWidth='md'>
                <Grid container spacing={2}>
                  <Container maxWidth='xs' sx={{ mt: 5 }}>
                    <Stack direction='row' spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={12}>
                        <TextField
                          // error={errors.email && touched.email ? true : null}
                          // helperText={errors.email}
                          onChange={handleChange}
                          value={values.ingredients}
                          required
                          fullWidth
                          id='ingredients'
                          label='Ingredient'
                          placeholder='Eg: 1/2 cup of sugar'
                          name='ingredients'
                          sx={{ width: 397 }}
                        />
                      </Grid>
                      <IconButton size='large' color='success'>
                        <AddIcon />
                      </IconButton>
                    </Stack>

                    <Grid item xs={12}>
                      <TextField
                        // error={errors.email && touched.email ? true : null}
                        // helperText={errors.email}
                        onChange={handleChange}
                        value={values.title}
                        required
                        fullWidth
                        id='title'
                        label='Recipe Title'
                        placeholder='Title about this recipe...'
                        name='title'
                      />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <TextField
                        // error={errors.email && touched.email ? true : null}
                        // helperText={errors.email}
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
                        // error={errors.email && touched.email ? true : null}
                        // helperText={errors.email}
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
                        // error={errors.email && touched.email ? true : null}
                        // helperText={errors.email}
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
                        // error={errors.email && touched.email ? true : null}
                        // helperText={errors.email}
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
                        // error={errors.email && touched.email ? true : null}
                        // helperText={errors.email}
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

                    <label htmlFor='contained-button-file'>
                      <Input
                        accept='image/*'
                        id='contained-button-file'
                        type='file'
                        multiple
                        onChange={(e) => e.target.files[0]}
                      />
                      <Button
                        variant='contained'
                        component='span'
                        sx={{ mt: 3 }}>
                        Upload Thumbnail
                      </Button>
                      {/* {imgURL ? (
                        <Box sx={{ width: '100%' }}>
                          <ProgressBar value={progress} progress={progress} />
                        </Box>
                      ) : null} */}
                    </label>
                  </Container>
                  <Grid item xs={12}>
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
                        type='submit'
                        fullWidth
                        onClick={handleSubmit}
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}>
                        Create Recipe!
                      </Button>
                    </Container>
                  </Grid>
                </Grid>
              </Container>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}

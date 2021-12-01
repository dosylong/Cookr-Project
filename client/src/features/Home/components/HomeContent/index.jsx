import { Container, Grid, Fab, Zoom } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Banner from 'components/Banner';
import DishCard from 'features/Dish/components/DishCard';
import PropTypes from 'prop-types';
import React from 'react';
import './HomeContent.css';

HomeContent.propTypes = {
  allDishes: PropTypes.array,
};

HomeContent.defaultProps = {
  allDishes: [],
};

export default function HomeContent(props) {
  const { allDishes } = props;
  return (
    <>
      <Banner />
      <Container maxWidth='lg'>
        <Typography variant='h3' align='center'>
          Latest dish recipe
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}>
          {allDishes?.map((dish) => (
            <Grid item xs={2} sm={4} md={4} key={dish.id}>
              <DishCard dish={dish} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Zoom in={true} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
        <Fab color='secondary' className='fab' sx={{ position: 'fixed', p: 5 }}>
          <MoreHoriz fontSize='large' />
        </Fab>
      </Zoom>
    </>
  );
}

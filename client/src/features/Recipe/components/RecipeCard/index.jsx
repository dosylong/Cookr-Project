import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
// import Avatar from '@mui/material/Avatar';

RecipeCard.propTypes = {
  recipes: PropTypes.array,
};
RecipeCard.defaultProps = {
  recipes: [],
};

function RecipeCard(props) {
  const { recipes } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      {recipes.map((recipe) => (
        <CardActionArea>
          <CardHeader
            // avatar={
            //   <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            //     R
            //   </Avatar>
            // }
            title={recipe.title}
          />
          <CardMedia
            component='img'
            height='140'
            image={recipe.coverImage}
            alt='post'
          />
          <CardContent>
            <Typography variant='body2' color='text.secondary'>
              {recipe.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      ))}
    </Card>
  );
}

export default RecipeCard;

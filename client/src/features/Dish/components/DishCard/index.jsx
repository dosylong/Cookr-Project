import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
  Box,
  Avatar,
  Rating,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react';
import { Link } from 'react-router-dom';
import './DishCard.css';
import { styled } from '@mui/material/styles';
import moment from 'moment';

DishCard.propTypes = {};

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

function DishCard(props) {
  const { dish } = props;
  const photoDishURL =
    'https://www.englishclub.com/images/vocabulary/food/good-foods.jpg';

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Card sx={{ maxWidth: 300, borderRadius: 3 }} className='cardEffect'>
        <Link
          onClick={scrollToTop}
          to={`/dish/${dish.dishSlug}`}
          className='cardLink'>
          <CardActionArea>
            <CardHeader
              avatar={<Avatar src={dish.user.photoURL} />}
              title={dish.user.fullName}
              subheader={moment(dish.createdAt).format('DD-MM-YYYY')}
            />
            <CardMedia
              component='img'
              height='194'
              image={photoDishURL}
              alt={dish.name}
            />
            <CardContent sx={{ width: 300, whiteSpace: 'nowrap' }}>
              <Typography
                variant='h5'
                color='text.secondary'
                sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {dish.name}
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {dish.description}
              </Typography>
            </CardContent>
            <Divider variant='middle' />

            <CardActions disableSpacing>
              <Box
                sx={{
                  '& > legend': { mt: 2 },
                }}>
                <Typography component='legend'>Give me some heart!</Typography>
                <StyledRating
                  name='customized-color'
                  defaultValue={2}
                  getLabelText={(value) =>
                    `${value} Heart${value !== 1 ? 's' : ''}`
                  }
                  readOnly
                  precision={0.5}
                  icon={<FavoriteIcon fontSize='inherit' />}
                  emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
                />
              </Box>
            </CardActions>
          </CardActionArea>
        </Link>
      </Card>
    </>
  );
}

export default DishCard;

import React from 'react';
import './HomeContent.css';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Banner from 'components/Banner';
import { Divider, Container } from '@mui/material';
import Category from 'components/Category';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export default function HomeContent() {
  const photoURL = useSelector((state) => state.userAuth.photoURL);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;

  return (
    <>
      <Banner />
      <Category />
      <Container maxWidth='lg'>
        <Typography variant='h4'>Latest recipe</Typography>
        <div className='card'>
          <Stack direction='row' spacing={5}>
            <Card
              sx={{ maxWidth: 300, borderRadius: 3 }}
              className='cardEffect'>
              <CardActionArea>
                <Link to='/asd' className='cardLink'>
                  <CardHeader
                    avatar={<Avatar src={photoURL} />}
                    title='Shrimp and Chorizo Paella'
                    subheader={today}
                  />
                  <CardMedia
                    component='img'
                    height='194'
                    image={photoURL}
                    alt='Paella dish'
                  />
                  <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                      This impressive paella is a perfect party dish and a fun
                      meal to cook together with your guests. Add 1 cup of
                      frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent>
                  <Divider variant='middle' />
                  <CardActions disableSpacing>
                    <Box
                      sx={{
                        '& > legend': { mt: 2 },
                      }}>
                      <Typography component='legend'>
                        Give me some heart!
                      </Typography>
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
                </Link>
              </CardActionArea>
            </Card>
          </Stack>
        </div>
      </Container>
    </>
  );
}

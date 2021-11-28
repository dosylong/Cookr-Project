import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import { useSelector } from 'react-redux';
import styles from './Category.module.css';
import categoryApi from 'api/categoryApi';

export default function Category() {
  const photoURL = useSelector((state) => state.userAuth.photoURL);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      const getCategory = async () => {
        const response = await categoryApi.getCategory();
        setCategories(response);
      };
      getCategory();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Container maxWidth='lg'>
        <Typography variant='h4'>Category</Typography>
        <div className={styles.card}>
          <Stack direction='row' spacing={5} sx={{ pt: 2 }}>
            {categories.map((category) => (
              <Card
                key={category.id}
                sx={{
                  maxWidth: 300,
                  borderRadius: 3,
                }}
                className={styles.cardEffect}>
                <CardActionArea>
                  <Link to='/asd' className={styles.cardLink}>
                    <CardMedia
                      component='img'
                      height='194'
                      image={photoURL}
                      alt={category.description}
                    />

                    <CardActions disableSpacing>
                      <Typography variant='h6'>
                        {category.description}
                      </Typography>
                    </CardActions>
                  </Link>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        </div>
      </Container>
    </div>
  );
}

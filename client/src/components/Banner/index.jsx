import React from 'react';
import { Typography } from '@mui/material';
import Typewriter from 'typewriter-effect';
import './Banner.css';

export default function Banner() {
  const sentences = ['breakfast', 'lunch', 'dinner'];

  return (
    <div className='banner'>
      <div className='bannerTitle'>
        <Typography variant='h2'>🍱</Typography>
        <Typography variant='h1'>
          A wonderful place for cooking lovers!
        </Typography>
        <Typography component={'span'}>
          <Typography variant='h4'>The collection of recipes for</Typography>
          <div className='typewriter'>
            <Typewriter
              options={{
                strings: sentences,
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </Typography>
      </div>
    </div>
  );
}

import { Typography } from '@mui/material';
import React from 'react';
import Typewriter from 'typewriter-effect';
import './HomePage.css';

export default function HomePage() {
  const sentences = ['breakfast', 'lunch', 'dinner'];
  return (
    <>
      <div className='home_page'>
        <div className='title'>
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
            {/* <button className="join_us" onClick={() => {window.location.href = '/login'}}>
            <span>Join us now!</span>
          </button> */}
          </Typography>
        </div>
      </div>
    </>
  );
}

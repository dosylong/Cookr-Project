import { Typography } from '@mui/material';
import React from 'react';
import './NotFound.css';
import notFoundImage from 'assets/Not_Found.png';

export default function NotFound() {
  return (
    <div className='not_found'>
      <Typography variant='h3' className='not_found_content'>
        Something went wrong...
      </Typography>
      <img src={notFoundImage} alt='404' />
    </div>
  );
}

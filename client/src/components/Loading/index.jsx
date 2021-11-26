import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function CustomLoading(props) {
  const { type } = props;
  const Loading = () => (
    <div className='circle'>
      <CircularProgress size={50} thickness={5} />
    </div>
  );
  if (type === 'custom') return <Loading />;
}

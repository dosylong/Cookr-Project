import React from 'react'
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import Box from '@mui/material/Box';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
            <Link color="inherit" href="/">
              Cookr
            </Link>{' '}
              {new Date().getFullYear()}{'.'}
        </Typography>
  );
}

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Cookr
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Some text about footer
        </Typography>
        <Copyright />
    </Box>
  )
}

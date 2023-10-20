import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from './typography';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'warning.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark',
  },
};

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'primary.dark' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 80 }}
            >
            <Grid item xs={6} sm={4} md={2}>
              <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link href="/sobre" color="rgb(255,255,255)">Sobre</Link>
                </Box>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link href="/suporte" color="rgb(255,255,255)">Suporte</Link>
                </Box>
              </Box>
            </Grid>
              <Grid item>
                {/*<Copyright />*/}
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </Container>
    </Typography>
  );
}

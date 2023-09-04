import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Toolbar from './Toolbar';
import SignOut from './signOut';
import MuiAppBar from '@mui/material/AppBar';
const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  return (
    <div>
      <MuiAppBar elevation={0} position="fixed" {...props}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'EcoArtes'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/premium-themes/onepirate/sign-in/"
              sx={rightLink}
            >
              {'Sign In'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/premium-themes/onepirate/sign-up/"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {'Sign Up'}
            </Link> */}
            <SignOut></SignOut>
          </Box>
        </Toolbar>
      </MuiAppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;

import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Toolbar from './toolbar';
import SignOut from './signOut';
import MuiAppBar from '@mui/material/AppBar';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import { Label } from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};




function AppAppBar(props) {
  
  const { data: session, status } = useSession({
    required: false,
    onUnauthenticated() {
      return router.push('/auth/login');
    },
  });
  const router = useRouter();
  const { id } = router.query;  

  return (
    <div>
      <MuiAppBar elevation={0} position="fixed">
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
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <a>{props.sessao ? props.sessao.nome.split(' ')[0] : 'Visitante'}</a>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => { 
                // Aqui vai a rota para o perfil do usuário
                if(session.user.lojista){
                  router.push(`/auth/lojista`)
                } else if (session.user.usuario.tipoUsuario == 'usuario'){
                  router.push(`/perfilComprador/${session.user.usuario.id}`)
                } else if (session.user.usuario.tipoUsuario == 'admin'){
                  router.push(`/auth/admin`)
                } else {
                  router.push(`/auth/login`)
                }
              }}
              color="inherit"
              >
              <AccountCircle />
            </IconButton>
            <IconButton
              size="large"
              aria-label="cart"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => { window.location.href = "/carrinho" }}
              color="inherit" 
            >
              <LocalGroceryStoreIcon />
            </IconButton>
            <SignOut></SignOut>
          </Box>
        </Toolbar>
      </MuiAppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;

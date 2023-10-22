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
  if(status === 'authenticated'){
    const tipoUsuario_logado = session.user.lojista ? session.user.lojista: session.user.usuario
    if(tipoUsuario_logado == session.user.usuario){
      if(session.user.usuario.tipoUsuario === 'usuario'){ //comprador logado
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
                  <a>{props.sessao ? props.sessao.nome : session.user.usuario.nome}</a>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => { 
                      // Aqui vai a rota para o perfil do usuário
                      router.push(`/perfilComprador/${session.user.usuario.id}`)
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
      else if(session.user.usuario.tipoUsuario === 'admin'){ //admin logado
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
                  <a>{props.sessao ? props.sessao.nome : session.user.usuario.nome}</a>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => { 
                      // Aqui vai a rota para o perfil do usuário
                      router.push(`/auth/admin`)
                    }}
                    color="inherit"
                    >
                    <AccountCircle />
                  </IconButton>
                  <SignOut></SignOut>
                </Box>
              </Toolbar>
            </MuiAppBar>
            <Toolbar />
          </div>
        );
      }
    }
    else{ //lojista logado
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
                <a>{props.sessao ? props.sessao.nome : session.user.lojista.nome}</a>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => { 
                    // Aqui vai a rota para o perfil do usuário
                    router.push(`/auth/lojista`)
                  }}
                  color="inherit"
                  >
                  <AccountCircle />
                </IconButton>
                <SignOut></SignOut>
              </Box>
            </Toolbar>
          </MuiAppBar>
          <Toolbar />
        </div>
      );
    }  
  }
  else{ //visitante
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
              <a>{props.sessao ? props.sessao.nome : 'Visitante'}</a>
              <IconButton
                disabled
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                >
                <AccountCircle />
              </IconButton>
              <SignOut></SignOut>
            </Box>
          </Toolbar>
        </MuiAppBar>
        <Toolbar />
      </div>
    );
  }
}

export default AppAppBar;
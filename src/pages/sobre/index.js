import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import AppAppBar from '@/components/appAppBar';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import BannerLayout from '@/components/bannerLayout';
import Image from 'next/image';
import session from 'redux-persist/lib/storage/session';
import AppFooter from '@/components/appFooter';
export default function Sobre() {
  const [sessao, setSession] = useState(null);
  
  useEffect(() => {
    if (session) {
      setSession(session.user.usuario);

    }
  }, []);

  const { data: session, status } = useSession({
    required: false,
    onUnauthenticated() {
      return router.push('/auth/login');
    },
  });

  
  return (
    <>
      <div >
        <AppAppBar sessao={sessao} />
        
        <BannerLayout sxBackground={{
          backgroundImage: `url('/fundos_sobre.jpg')`,
          bgcolor: 'background.paper',
          backgroundPosition: 'center',
        }}>
          <Typography
            color="inherit"
            align="center"
            variant="h2"
            marked="center"
            sx={{ mb: 4 }}
          >
            Sobre Nossa Empresa
          </Typography>
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            sx={{ mb: 10 }}
          >
            Conheça um pouco mais sobre a nossa empresa
          </Typography>
          <Image
            width={500}
            height={500}
            style={{ display: 'none' }}
            src="/fundos_sobre.jpg"
            alt="increase priority"
          />
          <Container align="center" maxWidth="md" style={{ marginTop: '0rem' }}>
            <Box p={3}>
              <Typography variant="body1" paragraph>
                Bem-vindo à nossa empresa, onde oferecemos soluções incríveis para os nossos clientes.
              </Typography>
              <Typography variant="body1" paragraph>
                Nossa missão é tornar a vida mais fácil e eficiente para todos.
              </Typography>
              <Typography variant="body1" paragraph>
                Fornecemos produtos e serviços de alta qualidade e inovação constante.
              </Typography>
              <Typography variant="body1" paragraph>
                Seja bem-vindo à nossa jornada!
              </Typography>
            </Box>
          </Container>
        </BannerLayout>
        
        <Container component="section" sx={{ mt: 8, mb: 4 }}>
          {/* Escrita e botão */}
          <Container maxWidth="md">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                mb: 8,
              }}
            >
              <Paper>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h4" marked="center" align="center" component="h2">
                    Nossa História
                  </Typography>
                  <Typography variant="h5" marked="center" align="center" component="h2">
                    Conheca
                  </Typography>

                  <Button></Button>
                </Box>
              </Paper>
            </Box>
          </Container>
          {/* Imagens */}
          <Container maxWidth="md">
            
          </Container>

        </Container>
        <AppFooter />
      </div>
    </>
  )
}
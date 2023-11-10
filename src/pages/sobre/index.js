import React from 'react';
import { Container, Typography, Paper, Box, Button, Grid, Divider, CardContent, Card } from '@mui/material';
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

  const images = [
    {
      src: '/couro-peixe-exemplo.jpg',
      alt: 'couro',
    }
  ]
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
            Sobre Nós
          </Typography>
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            sx={{ mb: 10 }}
          >
            Conheça um pouco mais sobre a EcoArtes
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


        <AppFooter />
      </div>
    </>
  )
}
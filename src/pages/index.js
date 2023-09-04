import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Login from './auth/login'
import { Inter } from 'next/font/google';

import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'

import AppAppBar from '@/components/appAppBar'
import AppFooter from '@/components/appFooter'
import * as React from 'react';
import Button from '@/components/button';
import BannerLayout from '@/components/bannerLayout';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '@/components/Typography';
import { styled } from '@mui/material/styles';

const inter = Inter({ subsets: ['latin'] })
const backgroundImage =
  'https://source.unsplash.com/random';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: 'latex_exemplo.jpg',
    title: 'Látex',
    width: '40%',
  },
  {
    url: 'fribras_exemplo.jpg',
    title: 'Fribras',
    width: '20%',
  },
  {
    url: 'coquinho_exemplo.jpg',
    title: 'Coquinho',
    width: '40%',
  },
  {
    url: 'ceramica_exemplo.jpg',
    title: 'Cerâmica',
    width: '38%',
  },
  {
    url: 'artesanado_barro_exemplo.jpg',
    title: 'Artesanato em barro',
    width: '38%',
  },
  {
    url: 'artesanato_madeira_exemplo.jpg',
    title: 'Artesanato em madeira',
    width: '24%',
  },
  {
    url: 'couro-peixe-exemplo.jpg',
    title: 'Couro',
    width: '40%',
  },
  {
    url: 'artesanato-da-regiao-norte_exemplo.jpg',
    title: 'Mais +',
    width: '60%',
  },
];


export default function Home() {
  const router = useRouter()

  const { data:session,  status } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/login')
    },
  })


  if(status === 'loading'||status === 'authenticated'){
    return (
      <>
        <AppAppBar></AppAppBar>
        

        <BannerLayout
          sxBackground={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundColor: '#7fc7d9', // Average color of the background image.
            backgroundPosition: 'center',
          }}
        >
          {/* Increase the network loading priority of the background image. */}
          <img
            style={{ display: 'none' }}
            src={backgroundImage}
            alt="increase priority"
          />
          <Typography color="inherit" align="center" variant="h2" marked="center">
            Produtos regionais da Amazonia
          </Typography>
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
          >
            Descubra pinturas, bijuterias e muito mais feitas por artistas independentes
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            component="a"
            href="/premium-themes/onepirate/sign-up/"
            sx={{ minWidth: 200 }}
          >
            Veja mais !
          </Button>
          <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
            Discover the experience
          </Typography>
        </BannerLayout>

        <Container component="section" sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h4" marked="center" align="center" component="h2">
            Conheça o Artesanato da Amazonia
          </Typography>
          <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
            {images.map((image) => (
              <ImageIconButton
                key={image.title}
                style={{
                  width: image.width,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 40%',
                    backgroundImage: `url(${image.url})`,
                  }}
                />
                <ImageBackdrop className="imageBackdrop" />
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'common.white',
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h6"
                    color="inherit"
                    className="imageTitle"
                  >
                    {image.title}
                    <div className="imageMarked" />
                  </Typography>
                </Box>
              </ImageIconButton>
            ))}
          </Box>
        </Container>
        

        <AppFooter></AppFooter>
      </>
    )
  }

}

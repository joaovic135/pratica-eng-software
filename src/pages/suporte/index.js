import React from 'react';
import { Container, Typography, Paper, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import AppAppBar from '@/components/appAppBar';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import BannerLayout from '@/components/bannerLayout';
import Image from 'next/image';
import { SvgIcon } from '@mui/material';
import session from 'redux-persist/lib/storage/session';
import AppFooter from '@/components/appFooter';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function Suporte() {
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
            
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Contato
                    </Typography>
                    <Typography variant="body1">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <Typography variant="body2" color="text.secondary" 
                                    sx={{ display: 'flex', alignItems: 'center', marginBottom: 1}}>
                                    <Box component="span" sx={{ width: 24, height: 24, mr: 1 }}>
                                        <WhatsAppIcon />
                                    </Box>
                                    (92) 99177-7777

                                </Typography>
                                <Divider sx={{backgroundColor: "black", height: 3}} />
                                <Typography variant="body2" color="text.secondary" 
                                    sx={{ display: 'flex', alignItems: 'center', marginTop: 1} }>
                                    <Box component="span" sx={{ width: 24, height: 24, mr: 1, }}>
                                        <EmailIcon />
                                    </Box>
                                    ecoForest@hotmail.com
                                </Typography>
                            </Box>
                        </Box>
                    </Typography>
                </Paper>
                <Container >
                    <Typography variant="h4" component="h1" gutterBottom>
                        Perguntas frequentes
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText 
                                primary="Como faço para entrar em contato?" 
                                secondary="Você pode entrar em contato pelo WhatsApp (92) 99177-7777 ou pelo email ecoForest@hotmail.com." 
                            />
                        </ListItem>
                        <Divider sx={{backgroundColor: "black", height: 2}} />
                        <ListItem>
                            <ListItemText 
                                primary="Qual é o horário de atendimento?" 
                                secondary="Nosso horário de atendimento é de segunda a sexta-feira, das 9h às 18h." 
                            />
                        </ListItem>
                        <Divider sx={{backgroundColor: "black", height: 2}} />
                        <ListItem>
                            <ListItemText 
                                primary="Como faço para solicitar um pedido?" 
                                secondary="Você pode fazer um pedido através do nosso site ou entrando em contato conosco pelo WhatsApp ou email." 
                            />
                        </ListItem>
                        <Divider sx={{backgroundColor: "black", height: 2}} />
                        {/* Colocar novas perguntas */}
                    </List>
                </Container>
            </Container>
            

            <AppFooter />
        </div>
        </>
    )
}
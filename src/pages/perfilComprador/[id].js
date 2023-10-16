import React, { useState } from 'react';
import { Card, CardContent, Typography, Tab, Tabs, Paper, Button, Grid, Link, Box, SvgIcon } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { APIURL } from '@/lib/constants';
import AppAppBar from '@/components/appAppBar';
import Loading from '@/components/Loading';

export default function PerfilLojista() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [lojistas, setLojistas] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/login');
    },
  });
  const { id } = router.query;
  const user = session.user.usuario
  console.log("Id user..:",id)
  console.log("Id user session..:",session.user.usuario.id)
  console.log("User..:",user)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

    React.useEffect(() => {
        if (session && id) {
            fetch(`${APIURL}/api/seguindo/?id=${id}`, {
                method: 'GET',
            })
            .then((resp) => resp.json())
            .then((json) => {
                setLojistas(json.lojistas);
                console.log("Lojistas..:",json.lojistas)
            })
            .catch((error) => {
                // Trate erros, por exemplo, redirecionando para uma página de erro.
            });
            fetch(`${APIURL}/api/seguirLojista?idComprador=${session.user.usuario.id}&idLojista=${id}`, {
                method: 'GET',
            })
            .then((resp) => resp.json())
            .then((json) => {
                setIsFollowing(json);
            })
            .catch((error) => {
                // Trate erros, por exemplo, redirecionando para uma página de erro.
            });
            fetch(`${APIURL}/api/users/?id=${id}`, {
                method: 'GET',
            })
            .then((resp) => resp.json())
            .then((json) => {
                setUsuario(json.usuario);
                console.log("Usuario..:",json.usuario)
            })
            .catch((error) => {
                // Trate erros, por exemplo, redirecionando para uma página de erro.
            });

        }
    }, [id, session]);

    const handleFollow = async (idLojista) => {
        if (isFollowing !== idLojista) {
            console.log("idLojista..:",idLojista," isFollowing..:",isFollowing)
            const response = await fetch(`${APIURL}/api/seguirLojista?idComprador=${session.user.usuario.id}&idLojista=${idLojista}`, {
            method: 'DELETE',
          });
          if (response.status === 200) {
            setIsFollowing(false);
          }else{
            const data = await response.json()
            const {error}  = data
            console.log(error);
          }
        } else {
          const response = await fetch(`${APIURL}/api/seguirLojista?idComprador=${session.user.usuario.id}&idLojista=${idLojista}`, {
            method: 'POST',
          });
          if (response.status === 200) {
            setIsFollowing(true);
          } else {
            const data = await response.json()
            const {error}  = data
            console.log(error);
          }
        }
        window.location.reload();
    };

  return (
    <div>
      {session && <AppAppBar sessao={session.user.usuario} />}
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Card style={{ maxWidth: 400, margin: '0 auto', borderRadius: 16 }}>
            <CardContent>
              <Grid container>
                <Grid item xs={12} sm={8}>
                  <div>
                    <Typography variant="h5" align="center">
                      {user.nome}
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                      {user.email}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <SvgIcon component={AccountCircleIcon} sx={{ fontSize: 80 }} />
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12}>
          <Paper square>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              centered
              aria-label="Tabs"
              indicatorColor="primary"
              textColor="primary"
              
            >
              <Tab label="Sequindo" />
              <Tab label="Avaliações" />
              <Tab label="Historico de compras" />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12}>
            {activeTab === 0 && (
                <Grid container justifyContent="center" spacing={2}>
                {lojistas && lojistas.map((lojista, index) => (
                    <Grid item key={index}>
                        <Card
                            style={
                                {
                                    width: 300,
                                    borderRadius: 16,
                                    textAlign: 'left',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }
                            }
                        >
                            <CardContent>
                                <Typography variant="h6">{lojista.nome}</Typography>
                                <Typography variant="body1">{lojista.email}</Typography>
                                <Typography variant="body1">{lojista.telefone}</Typography>
                                <Button 
                                    variant='contained' 
                                    color='primary' 
                                    onClick={() => router.push(`/perfilLojista/${lojista.id}`)}
                                >Ver perfil
                                </Button>
                                <Button
                                    onClick={() => handleFollow(lojista.id)}
                                    variant={isFollowing === lojista.id? "contained" : "outlined"}
                                >
                                    Seguindo
                                </Button>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                </Grid>
            )}
          {activeTab === 1 && (
            <Card style={{ maxWidth: 400, margin: '16px auto', borderRadius: 16 }}>
              <CardContent>
                <Typography variant="body1">Avaliações</Typography>
              </CardContent>
            </Card>
          )}
          
          {activeTab === 2 && (
            <Card style={{ maxWidth: 400, margin: '16px auto', borderRadius: 16 }}>
              <CardContent>
                <Typography variant="body1">Histórico de compras</Typography>
              </CardContent>
            </Card>
          )}

        </Grid>
      </Grid>
    </div>
  );
}

PerfilLojista.auth = true;
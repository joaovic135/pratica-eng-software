import React, { useState } from 'react';
import { Card, CardContent, Typography, Tab, Tabs, Paper, Button, Grid, Link, Box, SvgIcon } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { APIURL } from '@/lib/constants';
import AppAppBar from '@/components/appAppBar';
import Loading from '@/components/Loading';
import Rating from '@mui/material/Rating';
import Forbidden from '@/components/Forbidden';
import AppFooter from '@/components/appFooter_Fixo'
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
export default function PerfilComprador() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [lojistas, setLojistas] = useState(null);
  const [comprador, setComprador] = useState(null); //por enquanto nao funciona se for null
  const [avaliacoes_comprador, setAvaliacoes] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/login');
    },
  });

  const user = session.user.usuario
  //console.log("Id user..:",id)
  //console.log("Id user session..:",session.user.usuario.id)
  //console.log("User..:",user)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const { id } = router.query;

  React.useEffect(() => {
    if (session && id) {
      fetch(`${APIURL}/api/avaliacao_comprador/?id=${id}`, {
        method: 'GET',
      })
        .then(resp => resp.json())
        .then(json => {
          setComprador(json.comprador);
          //console.log(json.comprador.nome)
          setAvaliacoes(json.avaliacoes_comprador);
        })
        .catch((error) => {
          // Trate erros, por exemplo, redirecionando para uma página de erro.
        });
      fetch(`${APIURL}/api/seguindo/?id=${id}`, {
        method: 'GET',
      })
        .then((resp) => resp.json())
        .then((json) => {
          setLojistas(json.lojistas);
          //console.log("Lojistas..:",json.lojistas)
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
    }
  }, [id, session]);


  const handleFollow = async (idLojista) => {
    if (isFollowing !== idLojista) {
      //console.log("idLojista..:",idLojista," isFollowing..:",isFollowing)
      const response = await fetch(`${APIURL}/api/seguirLojista?idComprador=${session.user.usuario.id}&idLojista=${idLojista}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        setIsFollowing(false);
      } else {
        const data = await response.json()
        const { error } = data
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
        const { error } = data
        console.log(error);
      }
    }
    window.location.reload();
  };
  const handleConfig=async() =>{
    router.push('/auth/user')
  }


  if (session) {
    if (session.user.usuario.id === comprador.id) {
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
                          {comprador.nome}
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          {comprador.email}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <div style={{ marginTop: 1, marginBottom: 8,marginLeft:100 }}>
                        <IconButton color="secondary" aria-label="edit" onClick={handleConfig}>
                          <SettingsIcon style={{ color: grey[500] }} />
                        </IconButton>
                      </div>
                      <div style={{ marginTop: -40, marginBottom: 11 }}>
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
                  <Tab label="Lojistas seguidos" />
                  <Tab label="Avaliações" />
                  <Tab label="Histórico de compras" />
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
                          <Typography variant="body1">E-mail: {lojista.email}</Typography>
                          <Typography variant="body1">Telefone: {lojista.numero}</Typography>
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={() => router.push(`/perfilLojista/${lojista.id}`)}
                          >Ver perfil
                          </Button>
                          <Button
                            onClick={() => handleFollow(lojista.id)}
                            variant={isFollowing === lojista.id ? "contained" : "outlined"}
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
                <Grid container justifyContent="center" spacing={2}>
                  {avaliacoes_comprador &&
                    avaliacoes_comprador.map((avaliacoes_comprador, index) => (
                      <Grid item key={index}>
                        <Card
                          style={{
                            width: 300,
                            borderRadius: 16,
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <CardContent>
                            <Typography variant="body1">{avaliacoes_comprador.analise}</Typography>
                            <Box
                              sx={{
                                '& > legend': { mt: 2 },
                              }}
                            >
                              <Typography component="legend">Nota</Typography>
                              <Rating
                                name="read-only"
                                value={avaliacoes_comprador.avaliacao}
                                readOnly />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              )}

              {activeTab === 2 && (
                <Card style={{ maxWidth: 400, margin: '16px auto', borderRadius: 16 }}>
                  <CardContent>
                    <Typography variant="body1">Histórico de compras. Essa funcionalidade será implementada somente na sprint 6.</Typography>
                  </CardContent>
                </Card>
              )}

            </Grid>
          </Grid>
          <AppFooter sx={{ position: "fixed" }} />
        </div>
      );
    }
    else {
      return (
        <>
          <Forbidden />
        </>
      )
    }
  }
  else {
    return (
      <>
        <Forbidden />
      </>
    )
  }
}

PerfilComprador.auth = true;

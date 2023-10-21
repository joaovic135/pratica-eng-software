import { useState } from 'react';
import { Card, CardContent, Typography, Tab, Tabs, Paper, Button, Grid, Link, Box } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { APIURL } from '@/lib/constants';
import AppAppBar from '@/components/appAppBar';
import Loading from '@/components/Loading';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Star from '@mui/icons-material/StarRate'

export default function PerfilLojista() {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(null);
  const [lojista, setLojista] = useState(null);
  const [produtos, setProdutos] = useState(null);
  const [avaliacoes_lojista, setAvaliacoes] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [value, setValue] = React.useState(0);
  let notas = 0;
  let num_notas = 0;
  let media_notas = 0;

  const { data: session, status } = useSession({
    required: false,
    onUnauthenticated() {
      return router.push('/auth/login');
    },
  });
  const { id } = router.query;
  
  React.useEffect(() => {
    if (id) {
      fetch(`${APIURL}/api/lojista/?id=${id}`, {
        method: 'GET',
      })
        .then((resp) => resp.json())
        .then((json) => {
          setLojista(json.lojista);
          //console.log(json.lojista)
          setProdutos(json.produtos);
        })
        .catch((error) => {
          // Trate erros, por exemplo, redirecionando para uma página de erro.
        });
      fetch(`${APIURL}/api/avaliacao_lojista/?id=${id}`, { 
        method: 'GET',
      })
        .then(resp => resp.json())
        .then(json => {
          setAvaliacoes(json.avaliacoes_lojista);
        })
        .catch((error) => {
          // Trate erros, por exemplo, redirecionando para uma página de erro.
        });
    }
    if (session == null) {

    }
  }, [id], [session]);

  

  if (lojista === null) {
    return <div><Loading /></div>;
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const feedbacks = (avaliacoes_lojista)
  if(feedbacks){
    num_notas = feedbacks.length
    feedbacks.forEach((feedback) => {
      notas += feedback.avaliacao;
    })
    media_notas = notas / num_notas
  }

  //console.log(session.user.usuario.id)
  const idLojista = lojista.id
  //console.log(idComprador, idLojista)
  
  if(status === 'authenticated'){
    const tipoUsuario_logado = session.user.lojista ? session.user.lojista: session.user.usuario
    if(tipoUsuario_logado === session.user.usuario && session.user.usuario.tipoUsuario === 'usuario'){ //comprador logado
      const idComprador = session.user.usuario.id
      fetch(`${APIURL}/api/seguirLojista?idComprador=${idComprador}&idLojista=${id}`, {
        method: 'GET',
      })
        .then(resp => resp.json())
        .then(json => {
          setIsFollowing(json);
        })
        .catch((error) => {
          // Trate erros, por exemplo, redirecionando para uma página de erro.
        });
        const handleFollow = async () => {
          if (isFollowing) {
            const response = await fetch(`${APIURL}/api/seguirLojista?idComprador=${idComprador}&idLojista=${idLojista}`, {
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
            const response = await fetch(`${APIURL}/api/seguirLojista?idComprador=${idComprador}&idLojista=${idLojista}`, {
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
                          {lojista.nome} <Star/>{media_notas.toFixed(1)}
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          {lojista.email}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Button
                          onClick={handleFollow}
                          variant={isFollowing ? "contained" : "outlined"}
                        >
                          {isFollowing ? 'Seguindo' : 'Seguir'}
                        </Button>
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
                  <Tab label="Produtos/Serviços" />
                  <Tab label="Avaliações de usuários" />
                  <Tab label="Sobre" />
                </Tabs>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              {activeTab === 0 && (
                <Grid container justifyContent="center" spacing={2}>
                  {produtos &&
                    produtos.map((produto, index) => (
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
                            <Typography variant="h6">{produto.nome}</Typography>
                            <Typography variant="body1">{produto.descricao}</Typography>
                            <Typography variant="body1">Preço: R$ {produto.preco}</Typography>
                            <Typography variant="body1">Categoria: {produto.categoria}</Typography>
                            <Typography variant="body1">Estoque: {produto.estoque}</Typography>
                            <Button variant="contained" color="primary" href={`/produto/pagina/${produto.id}`}>
                              Ver detalhes
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              )}
              {activeTab === 1 && (
                <Grid container justifyContent="center" spacing={2}>
                {avaliacoes_lojista &&
                  avaliacoes_lojista.map((avaliacoes_lojista, index) => (
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
                          <Typography variant="body1">{avaliacoes_lojista.analise}</Typography>
                          <Box
                            sx={{
                              '& > legend': { mt: 2 },
                            }}
                          >
                            <Typography component="legend">Nota</Typography>
                            <Rating 
                              name="read-only" 
                              value={avaliacoes_lojista.avaliacao}
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
                    <Typography variant="body1">{lojista.descricao}</Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </div>
      );
    }
    else{ //admin ou lojista logado
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
                          {lojista.nome} <Star/>{media_notas.toFixed(1)}
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                          {lojista.email}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Button
                          disabled
                          //onClick={handleFollow}
                          variant={isFollowing ? "contained" : "outlined"}
                        >
                          {isFollowing ? 'Seguindo' : 'Seguir'}
                        </Button>
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
                  <Tab label="Produtos/Serviços" />
                  <Tab label="Avaliações de usuários" />
                  <Tab label="Sobre" />
                </Tabs>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              {activeTab === 0 && (
                <Grid container justifyContent="center" spacing={2}>
                  {produtos &&
                    produtos.map((produto, index) => (
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
                            <Typography variant="h6">{produto.nome}</Typography>
                            <Typography variant="body1">{produto.descricao}</Typography>
                            <Typography variant="body1">Preço: R$ {produto.preco}</Typography>
                            <Typography variant="body1">Categoria: {produto.categoria}</Typography>
                            <Typography variant="body1">Estoque: {produto.estoque}</Typography>
                            <Button variant="contained" color="primary" href={`/produto/pagina/${produto.id}`}>
                              Ver detalhes
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              )}
              {activeTab === 1 && (
                <Grid container justifyContent="center" spacing={2}>
                {avaliacoes_lojista &&
                  avaliacoes_lojista.map((avaliacoes_lojista, index) => (
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
                          <Typography variant="body1">{avaliacoes_lojista.analise}</Typography>
                          <Box
                            sx={{
                              '& > legend': { mt: 2 },
                            }}
                          >
                            <Typography component="legend">Nota</Typography>
                            <Rating 
                              name="read-only" 
                              value={avaliacoes_lojista.avaliacao}
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
                    <Typography variant="body1">{lojista.descricao}</Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </div>
      );
    }
  }
  else{ //visitante
    return (
      <div>
        <AppAppBar/>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Card style={{ maxWidth: 400, margin: '0 auto', borderRadius: 16 }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} sm={8}>
                    <div>
                      <Typography variant="h5" align="center">
                        {lojista.nome} <Star/>{media_notas.toFixed(1)}
                      </Typography>
                      <Typography variant="subtitle1" align="center">
                        {lojista.email}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Button
                        disabled
                        //onClick={handleFollow}
                        variant={isFollowing ? "contained" : "outlined"}
                      >
                        {isFollowing ? 'Seguindo' : 'Seguir'}
                      </Button>
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
                <Tab label="Produtos/Serviços" />
                <Tab label="Avaliações de usuários" />
                <Tab label="Sobre" />
              </Tabs>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {activeTab === 0 && (
              <Grid container justifyContent="center" spacing={2}>
                {produtos &&
                  produtos.map((produto, index) => (
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
                          <Typography variant="h6">{produto.nome}</Typography>
                          <Typography variant="body1">{produto.descricao}</Typography>
                          <Typography variant="body1">Preço: R$ {produto.preco}</Typography>
                          <Typography variant="body1">Categoria: {produto.categoria}</Typography>
                          <Typography variant="body1">Estoque: {produto.estoque}</Typography>
                          <Button variant="contained" color="primary" href={`/produto/pagina/${produto.id}`}>
                            Ver detalhes
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            )}
            {activeTab === 1 && (
              <Grid container justifyContent="center" spacing={2}>
              {avaliacoes_lojista &&
                avaliacoes_lojista.map((avaliacoes_lojista, index) => (
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
                        <Typography variant="body1">{avaliacoes_lojista.analise}</Typography>
                        <Box
                          sx={{
                            '& > legend': { mt: 2 },
                          }}
                        >
                          <Typography component="legend">Nota</Typography>
                          <Rating 
                            name="read-only" 
                            value={avaliacoes_lojista.avaliacao}
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
                  <Typography variant="body1">{lojista.descricao}</Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

//PerfilLojista.auth = true;
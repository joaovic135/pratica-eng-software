import { useState } from 'react';
import { Card, CardContent, Typography, Tab, Tabs, Paper, Button, Grid, Link, Box, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import { Modal, IconButton } from '@mui/material';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avaliacao, setAvaliacao] = useState(0);
  const [analise, setAnalise] = useState('');
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
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const feedbacks = (avaliacoes_lojista)
  if (feedbacks) {
    num_notas = feedbacks.length
    feedbacks.forEach((feedback) => {
      notas += feedback.avaliacao;
    })
    media_notas = notas / num_notas
  }

  //console.log(session.user.usuario.id)
  const idLojista = lojista.id
  //console.log(idComprador, idLojista)

  if (status === 'authenticated') {
    const tipoUsuario_logado = session.user.lojista ? session.user.lojista : session.user.usuario
    if (tipoUsuario_logado === session.user.usuario && session.user.usuario.tipoUsuario === 'usuario') { //comprador logado
      const idComprador = session.user.usuario.id
      console.log("aqqui: ", session.user.usuario.id)
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
          } else {
            const data = await response.json()
            const { error } = data
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
            const { error } = data
            console.log(error);
          }
        }
      };
      const handleAvaliarLojista = async () => {
        try {
          // Validar se a nota e a análise são válidas antes de enviar
          if (avaliacao <= 0 || avaliacao > 5) {
            console.error('A nota deve ser entre 1 e 5.');
            return;
          }

          if (!analise.trim()) {
            console.error('A análise não pode estar vazia.');
            return;
          }

          // Enviar a avaliação para o backend
          const response = await fetch(`${APIURL}/api/avaliacao_lojista`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idComprador: idComprador,
              idLojista: idLojista, // Você precisa do ID do lojista para associar a avaliação ao lojista específico
              avaliacao: avaliacao,
              analise: analise,
            }),
          });

          if (response.ok) {
            console.log('Avaliação enviada com sucesso!');
            // Limpar os campos após a avaliação ter sido enviada com sucesso
            setAvaliacao(0);
            setAnalise('');
            // Você pode adicionar lógica adicional aqui, como atualizar a interface do usuário para refletir a nova avaliação
          } else {
            console.error('Erro ao enviar a avaliação.');
          }
        } catch (error) {
          console.error('Erro ao enviar a avaliação:', error);
        }
        handleCloseModal();
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
                        {!isNaN(media_notas) ? (
                          <Typography variant="h5" align="center">
                            {lojista.nome} <Star />{media_notas.toFixed(1)}
                          </Typography>
                        ) : (
                          <Typography variant="h5" align="center">
                            {lojista.nome} - Sem Avaliações Ainda
                          </Typography>
                        )}
                        <Typography variant="subtitle1" align="center">
                          {lojista.email}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div style={{ marginTop: 1, marginBottom: 8 }}>
                        <Button
                          onClick={handleFollow}
                          variant={isFollowing ? "contained" : "outlined"}
                        >
                          {isFollowing ? 'Seguindo' : 'Seguir'}
                        </Button>
                      </div>
                      <div style={{ marginTop: 1, marginBottom: 8 }}>
                      <Button variant="outlined" onClick={handleOpenModal}>
                        Avaliar
                      </Button>

                      <Modal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                      >
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
                            Registrar Avaliação
                          </Typography>
                          <Rating
                            name="avaliacao"
                            value={avaliacao}
                            onChange={(event, newValue) => {
                              setAvaliacao(newValue);
                            }}
                          />
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            label="Escreva sua análise"
                            value={analise}
                            onChange={(event) => {
                              setAnalise(event.target.value);
                            }}
                            sx={{ mt: 2 }}
                          />
                          <Box sx={{ mt: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleAvaliarLojista}>
                              Enviar Avaliação
                            </Button>
                            <IconButton onClick={handleCloseModal} sx={{ ml: 2 }}>
                              Cancelar
                            </IconButton>
                          </Box>
                        </Box>
                      </Modal>
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
                  <Tab label="Produtos" />
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
                            <Typography variant="body1">Preço: R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Typography>
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
    else { //admin ou lojista logado
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
                        {!isNaN(media_notas) ? (
                          <Typography variant="h5" align="center">
                            {lojista.nome} <Star />{media_notas.toFixed(1)}
                          </Typography>
                        ) : (
                          <Typography variant="h5" align="center">
                            {lojista.nome} - Sem Avaliações Ainda
                          </Typography>
                        )}
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
                  <Tab label="Produtos" />
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
                            <Typography variant="body1">Preço: R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Typography>
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
  else { //visitante
    return (
      <div>
        <AppAppBar />
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Card style={{ maxWidth: 400, margin: '0 auto', borderRadius: 16 }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} sm={8}>
                    <div>
                      {!isNaN(media_notas) ? (
                        <Typography variant="h5" align="center">
                          {lojista.nome} <Star />{media_notas.toFixed(1)}
                        </Typography>
                      ) : (
                        <Typography variant="h5" align="center">
                          {lojista.nome} - Sem Avaliações Ainda
                        </Typography>
                      )}
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
                <Tab label="Produtos" />
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
                          <Typography variant="body1">Preço: R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Typography>
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


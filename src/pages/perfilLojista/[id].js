import React, { useState } from 'react';
import { Card, CardContent, Typography, Tab, Tabs, Paper, Button, Grid, Link, Box } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { APIURL } from '@/lib/constants';
import AppAppBar from '@/components/appAppBar';
import Loading from '@/components/Loading';

export default function PerfilLojista() {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  const [lojista, setLojista] = useState(null);
  const [produtos, setProdutos] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/login');
    },
  });
  const { id } = router.query;

  React.useEffect(() => {
    if (session && id) {
      fetch(`${APIURL}/api/lojista/?id=${id}`, {
        method: 'GET',
      })
        .then((resp) => resp.json())
        .then((json) => {
          setLojista(json.lojista);
          setProdutos(json.produtos);
        })
        .catch((error) => {
          // Trate erros, por exemplo, redirecionando para uma página de erro.
        });
      fetch(`${APIURL}/api/avaliacao/`, { 
        method: 'GET',
      })
        .then(resp => resp.json())
        .then(json => {
          setAvaliacoes(json);
        })
        .catch((error) => {
          // Trate erros, por exemplo, redirecionando para uma página de erro.
        });
    }
  }, [id, session]);

  if (lojista === null) {
    return <div><Loading /></div>;
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  console.log(session.user.usuario.id)
  const idComprador = session.user.usuario.id
  const idLojista = lojista.id
  console.log(idComprador, idLojista)
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
                      {lojista.nome}
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
            {avaliacoes &&
              avaliacoes.map((avaliacao, index) => (
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
                      <Typography variant="body1">{avaliacao.analise}</Typography>
                      <Typography variant="body1">Nota: {avaliacao.avaliacao}</Typography>
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

PerfilLojista.auth = true;

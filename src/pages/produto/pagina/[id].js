import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, createTheme, Image } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { useState } from "react";
import AppAppBar from '@/components/appAppBar';
import { APIURL } from '@/lib/constants';
import AppFooter from '@/components/appFooter'
import * as React from 'react';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded'
import Loading from '@/components/Loading';

export default function Produto_Pagina() {
  const router = useRouter()
  const [produto, setProduto] = useState([]);
  const [produtoCarregado, setProdutoCarregado] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [nome, setNome] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const [preco, setPreco] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [estoque, setEstoque] = useState([]);
  const [lojista, setLojista] = useState('');
  const [sessao, setSession] = useState(null);
  const { id } = router.query

  const { data: session, status } = useSession({
    required: false,
    onUnauthenticated() {
      return router.push('/auth/login');
    },
  });

  useEffect(() => {
    if (id) {
      if (session) {
        setSession(session.user.usuario);
      }
      fetch(`${APIURL}/api/produto/?id=${id}`, {
        method: 'GET',
      })
        .then(resp => {
          if (resp.status != 200) {
            router.push('/error');
            console.error('Produto não encontrado');
          } else {
            return resp.json();
          }
        })
        .then(json => {
          if (json) {
            setProduto(json.produto);
            setNome(json.produto.nome);
            setDescricao(json.produto.descricao);
            setPreco(json.produto.preco);
            setCategoria(json.produto.categoria);
            setEstoque(json.produto.estoque);
            setLojista(json.lojista.nome);
            setProdutoCarregado(true)
          }
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    }
    if (sessao == null) {
      console.log(session)
      if (session){
        setSession(session.user.usuario);
      }
    }
  }, [id], [sessao]);


  if (!produto) return <div><Loading /></div>

  const preventDefault = (event) => event.preventDefault();

  const theme = createTheme();

  const card = {
    height: '90ch',
    width: '130ch',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5)
  }

  const description = {
    marginBottom: theme.spacing(2),
    textAlign: 'justify',
    ml: 2,
    height: '40ch',
    margin: 5,
    width: '121ch'
  }

  return (
    <>
      <AppAppBar sessao={sessao} />

      {produtoCarregado ? (
        // Renderize as informações do produto
        <Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}>

            <Box sx={{
              marginTop: theme.spacing(2),
              width: '130ch'
            }}>
              <Typography variant="body1">
                <Link href="/" color="inherit">
                  Página Inicial
                </Link> &#62; {categoria} &#62; {nome}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Card raised sx={card} >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ marginTop: 50, marginLeft: 100 }}>
                    <CardMedia
                      sx={{ maxWidth: 400 }}
                      component="img"
                      image="/latex_exemplo.jpg"
                    />
                  </div>
                  <CardContent>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      m: 1,
                      marginLeft: 10

                    }}>
                      <div style={{ marginTop: 0, marginLeft: 0 }}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {nome}
                          </Typography>
                          <Typography gutterBottom variant="h7" component="div">
                            Vendido por {lojista}
                          </Typography>
                          <br></br>
                          <Typography variant="h5">
                            R$&nbsp;{preco}
                          </Typography>
                          <Typography variant="h7" color="green" >
                            Em estoque&nbsp;
                            <Typography variant="h7" color="black" >
                              ({estoque})
                            </Typography>
                          </Typography>
                          <CardActions> </CardActions>
                          <br></br>
                          <br></br>
                          <Button variant="outlined" startIcon={<ShoppingCartRounded />}>
                            Adicionar ao carrinho
                          </Button>
                        </CardContent>
                      </div>
                    </Box>
                  </CardContent>
                </Box>
                <Box sx={{
                  marginTop: theme.spacing(2),
                  marginBottom: theme.spacing(-5),
                  ml: 5,
                  width: '150ch'
                }}>
                  <Typography variant="h5">
                    Descrição
                  </Typography>
                </Box>
                <Card variant="outlined" sx={description}>
                  <Typography margin="5px" variant="body1" color="black">
                    {descricao}
                  </Typography>
                </Card>
              </Card>
            </div>
          </Box>
        </Box>
      ) : (
        // Renderize o componente de carregamento enquanto as informações estão sendo carregadas
        <Box>
          <Loading />
        </Box>
      )}


    </>
  )
}
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
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded'

export default function Produto() {
  const router = useRouter()
  const [produto, setProduto] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [nome, setNome] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const [preco, setPreco] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [estoque, setEstoque] = useState([]);


  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/lojista/login')
    },
  })

  const nomeLojista = session.user.lojista.nome
  const idLojista = session.user.lojista.id
  const { id } = router.query




  useEffect(() => {
    fetch(`${APIURL}/api/produto/edit/?id=${id}&idLojista=${idLojista}`, {
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(json => {
        setProduto(json)
        setNome(json.nome)
        setDescricao(json.descricao)
        setPreco(json.preco)
        setCategoria(json.categoria)
        setEstoque(json.estoque)
      })
  }, [])


  const handleEditClick = () => {
    router.push('/produto/edit/' + id)
    // Implemente a lógica para editar o produto aqui
  };


  const handleClickDelete = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false);
  }


  const handleDelete = async (e) => {
    e.preventDefault();

    const response = await fetch(`${APIURL}/api/produto/edit/?id=${id}&idLojista=${idLojista}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, descricao, preco, categoria, estoque })
    })
    // Chame a função onSave com o produto editado
    const data = await response.json()
    const { error } = data
    if (response.status === 401) return setError(error)
    router.push('/')
  };

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
    <AppAppBar></AppAppBar>  
        <Box 
            sx={{
            width: '100%',
            display:'flex',
            justifyContent:'center'
            }}>
    
            <Box sx={{
                marginTop: theme.spacing(2),
                width: '130ch'
            }}>
                <Typography variant="body1">
                    <Link  href="/" color="inherit">
                        Página Inicial
                    </Link> &#62; {produto.categoria} &#62; {produto.nome}
                </Typography>
            </Box>
        </Box>          
        <Box sx={{ width: '100%'}}>
            <div style={{ display:'flex', justifyContent:'center' }}>
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
                                            {produto.nome}
                                        </Typography>
                                        <Typography gutterBottom variant="h7" component="div">
                                            Vendido por {nomeLojista}
                                        </Typography>
                                        <br></br>
                                        <Typography variant="h5">
                                            R$&nbsp;{produto.preco}
                                        </Typography>
                                        <Typography variant="h7" color="green" >
                                            Em estoque&nbsp;
                                            <Typography variant="h7" color="black" >
                                                ({produto.estoque})
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
                        <Typography variant="body1" color="black">
                            {produto.descricao}
                        </Typography>
                    </Card>
                </Card>
            </div>
        </Box>
    <AppFooter></AppFooter>                  
    </>
  )
}


Produto.auth = true
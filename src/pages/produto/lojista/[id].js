import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, createTheme, Image } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { useState } from "react";
import Modal from '@mui/material/Modal';
import AppAppBar from '@/components/appAppBar';
import { APIURL } from '@/lib/constants';

export default function Produto() {
  const router = useRouter()
  const [produto, setProduto] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [nome, setNome] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const [preco, setPreco] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [estoque, setEstoque] = useState([]);
  const [sessao, setSession] = useState(null)


  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/lojista/login')
    },
  })

  const idLojista = session.user.lojista.id
  const { id } = router.query




  useEffect(() => {
    if (session){
      setSession(session.user.lojista)
    } 
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
  }, [id,idLojista,session])


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


  const theme = createTheme();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const card = {
    maxWidth: 500,
    margin: '0 auto',
    borderRadius: '10px',
    marginTop: theme.spacing(2),
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  }
  const media = {
    height: 250,
  }
  const description = {
    marginBottom: theme.spacing(2),
    textAlign: 'justify',
  }
  const actionButtons = {
    display: 'flex',
    justifyContent: 'space-between',
  }

  return (

    <>
      {sessao && <AppAppBar sessao={sessao} />}

      <Card sx={card}>
        <CardMedia
          sx={media}
          image="/latex_exemplo.jpg"
          title="green iguana"
        >

        </CardMedia>
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {produto.nome}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={description}>
            Descrição: {produto.descricao}
          </Typography>
          <Typography variant="body2" color="text.secondary" >
            Preço: R${produto.preco}
          </Typography>
          <Typography variant="body2" color="text.secondary" >
            Categoria: {produto.categoria}
          </Typography>
          <Typography variant="body2" color="text.secondary" >
            Estoque: {produto.estoque}
          </Typography>
        </CardContent>
        <CardActions sx={{ actionButtons }}>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Editar
          </Button>
          <Button variant="contained" color="error" onClick={handleClickDelete}>
            Deletar
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
      >
        <Box sx={style}>
          <Typography variant="h6" id="modal-title">
            Deseja deletar o produto ?
          </Typography>

          {/* Conteúdo do modal aqui */}
          <Button variant="contained" color="error" onClick={handleDelete}>
            Deletar
          </Button>

          <Button variant="contained" color="primary" onClick={handleModalClose}>
            Cancelar operação
          </Button>
        </Box>
      </Modal>

    </>

  )

}


Produto.auth = true
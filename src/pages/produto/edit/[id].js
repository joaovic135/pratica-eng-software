import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, FormControl, TextField, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Modal from '@mui/material/Modal';
import AppAppBar from '@/components/appAppBar';
import { APIURL } from '@/lib/constants';


export default function EditProductScreen() {
  const [produto, setProduto] = useState([]);
  const [nome, setNome] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const [preco, setPreco] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [estoque, setEstoque] = useState([]);

  const router = useRouter()

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/lojista/login')
    },
  })

  const idLojista = session.user.lojista.id
  const { id } = router.query



  useEffect(() => {
    fetch(`${APIURL}/api/produto/?id=${id}&idLojista=${idLojista}`, {
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



  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${APIURL}/api/produto/edit/?id=${id}&idLojista=${dLojista}`, {
      credentials: 'include',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, descricao, preco, categoria, estoque })
    })
    // Chame a função onSave com o produto editado
    const data = await response.json()
    const { error } = data
    if (response.status === 401) return setError(error)
    router.push('/produto/' + id)
  };

  const inputStyle = {
    marginBottom: '25px',
    width: '100%',
  };
  return (
    <>
      <AppAppBar />
      <Box
        component="form"
        sx={{ display: 'flex', justifyContent: 'center' }}
        noValidate
        autoComplete="off"
      >

        <FormControl sx={{width: '45%' , marginTop:'20px'}}>
          <Typography variant="h5" component="div" style={inputStyle}>
            Editar Produto
          </Typography>
          <TextField
            id="outlined-controlled"
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={inputStyle}
          />
          <TextField
            name="descricao"
            label="Descrição"
            variant="outlined"
            fullWidth
            multiline
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={inputStyle}
          />
          <TextField
            name="preco"
            label="Preço"
            variant="outlined"
            fullWidth
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            style={inputStyle}
          />
          <TextField
            name="categoria"
            label="Categoria"
            variant="outlined"
            fullWidth
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={inputStyle}
          />
          <TextField
            name="estoque"
            label="Estoque"
            type="number"
            variant="outlined"
            fullWidth
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
            style={inputStyle}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{padding: '10px'}}>
            Salvar
          </Button>

        </FormControl>
      </Box>
    </>
  );
}

EditProductScreen.auth = true
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

import Link from 'next/link';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { APIURL } from '@/lib/constants';


export default function Cadastrar() {
  const [error, setError] = useState(null);


  const router = useRouter()
  const [nome, setName] = useState([]);
  const [preco, setPreço] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [estoque, setEstoque] = useState([]);
  const [descricao, setDescricao] = useState([]);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/lojista/login')
    },
  })
  const idLojista = session.user.lojista.id
  const { id } = router.query

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${APIURL}/api/produto`, {
      credentials: 'include',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idLojista, nome, preco, categoria, estoque, descricao })
    })
    const data = await response.json()
    const { error } = data
    if (response.status === 401) return setError(error)

    router.push('/auth/lojista')
  }
  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Cadastre seu produto
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="nome-dado"
                name="nome"
                required
                fullWidth
                id="nome"
                label="Nome do produto"
                autoFocus
                value={nome}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="preco"
                label="Preço"
                name="preco"
                value={preco}
                onChange={(e) => setPreço(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="categoria"
                label="Categoria"
                name="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="estoque"
                label="Estoque"
                name="estoque"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="descricao"
                label="Descrição"
                name="descricao"
                autoComplete="descricao"
                multiline
                maxRows={20}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
          <Grid container justifyContent="flex-end">
          </Grid>
        </Box>
      </Box>
    </Container>




    /*
        <>
          <p>Essa é a pagina de SignIn</p>
          <Link href="/">Link Para Home</Link> <br />
          <button onClick={() => router.push('/')}>
            Link Para Home
          </button>
    
        </>
    */
  )
}
Cadastrar.auth = true
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

import Link from 'next/link';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


export default function SignUp() {
  const router = useRouter()
  const [error, setError] = useState(null);
  const [nome, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [senha, setSenha] = useState([]);
  const [telefone, setTelefone] = useState([]);
  const [endereco, setEndereco] = useState([]);
  const [cidade, setCidade] = useState([]);
  const [cep, setCep] = useState([]);

  /*
  const res = await fetch("http://localhost:3000/api/login", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              senha: credentials?.senha
            }),
          });
  */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/usuario", {
      credentials: 'include',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    })
    const data = await response.json()
    const { error } = data
    console.log("-------------------------------------------------------------------------------------")
    if (response.status === 401) return setError(error)

    router.push('/')
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
          Sign up
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
                label="Nome"
                autoFocus
                value={nome}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="senha"
                label="Senha"
                name="senha"
                autoComplete="senha"
                type='password'
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="telefon"
                label="Telefone"
                name="telefone"
                autoComplete="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="endereco"
                label="Endereço"
                name="endereco"
                autoComplete="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="cidade"
                label="Cidade"
                name="cidade"
                autoComplete="cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="cep"
                label="CEP"
                name="cep"
                autoComplete="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  Ja tem uma conta? Entre
                </Link>
              </Grid>
            </Grid>
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


import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Forbidden from '@/components/Forbidden';

export default function Editar() {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [descricao, setDescricao] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    fetch("http://localhost:3000/api/lojista/?id=" + id, {
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(json => {
        setNome(json.nome)
        setEmail(json.email)
        setNumero(json.numero)
        setDescricao(json.descricao)
      })
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:3000/api/lojistas/${id}`, {
      credentials: 'include',
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, numero, descricao}),
    });

    const data = await response.json();
    const { error } = data;

    if (response.status === 401) {
      return setError(error);
    }

    router.push('/lojistas');
  };

  if (session) {
    if (session.user.usuario.tipoUsuario === 'admin') {
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
          Editar informações
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="nome-dado"
                name="nome"
                required
                fullWidth
                id="nome"
                label="Nome"
                autoFocus
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
                id="telefone"
                label="Telefone"
                name="telefone"
                autoComplete="telefone"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="endereço"
                label="Endereço"
                name="endereço"
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
            Alterar
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item></Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}else{
  return(
      <Forbidden />
  )
}
} else{
return(
  <Forbidden />
)
}
}

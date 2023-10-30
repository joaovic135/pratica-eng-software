import { useRouter } from 'next/router'
import { useState } from "react";
import Link from 'next/link';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { APIURL } from '@/lib/constants';

export default function SignIn() {
  const router = useRouter()
  const [error, setError] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [numero, setNumero] = useState('');
  const [descricao, setDescricao] = useState('');

  const isPasswordSecure = (password) => {
    // Pelo menos 8 caracteres
    if (password.length < 8) {
      return false;
    }

    // Pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Pelo menos uma letra minúscula
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // Pelo menos um número
    if (!/[0-9]/.test(password)) {
      return false;
    }

    // Pelo menos um caractere especial (por exemplo, !@#$%^&*)
    if (!/[!@#$%^&*]/.test(password)) {
      return false;
    }

    return true;
  };

  const isEmailValid = (email) => {
    // Expressão regular para verificar o formato do email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const formatPhoneNumber = (value) => {
    // Remove todos os caracteres não numéricos
    const phoneNumber = value.replace(/\D/g, '');

    // Formata o número de telefone no formato brasileiro
    const formattedPhoneNumber = phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return formattedPhoneNumber;
  };

  const handleTelefoneChange = (e) => {
    setNumero(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar os campos
    if (nome.trim() === '') {
      setError('O campo Nome é obrigatório.');
      return;
    }

    if (email.trim() === '' || !isEmailValid(email)) {
      setError('O campo Email deve ser preenchido com um email válido.');
      return;
    }

    if (senha.trim() === '') {
      setError('O campo Senha é obrigatório.');
      return;
    }

    if (!isPasswordSecure(senha)) {
      setError('A senha deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais.');
      return;
    }

    if (numero.trim() === '') {
      setError('O campo Telefone é obrigatório.');
      return;
    }

    if (descricao.trim() === '') {
      setError('O campo Descrição é obrigatório.');
      return;
    }

    const response = await fetch(`${APIURL}/api/lojista`, {
      credentials: 'include',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, numero, descricao })
    })
    const data = await response.json()
    const {error}  = data
    if (response.status === 400) return setError("Email já cadastrado")

    router.push('/auth/lojista/login')
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
          Realizar cadastro de lojista
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
                label="Nome completo"
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
                id="numero"
                label="Telefone"
                name="numero"
                value={numero}
                onChange={handleTelefoneChange}
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
            Concluir cadastro
          </Button>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/lojista/login" variant="body2">
                Já tem uma conta? Entre
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

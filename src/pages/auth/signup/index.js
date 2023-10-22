import { useRouter } from 'next/router';
import { useState } from "react";
import Link from 'next/link';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { APIURL } from '@/lib/constants';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');

  // Função para verificar a segurança da senha
  const isPasswordSecure = (password) => {
    // Pelo menos 8 caracteres
    if (password.length < 8) {
      return 'A senha deve conter pelo menos 8 caracteres.';
    }

    // Pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(password)) {
      return 'A senha deve conter pelo menos uma letra maiúscula.';
    }

    // Pelo menos uma letra minúscula
    if (!/[a-z]/.test(password)) {
      return 'A senha deve conter pelo menos uma letra minúscula.';
    }

    // Pelo menos um número
    if (!/[0-9]/.test(password)) {
      return 'A senha deve conter pelo menos um número.';
    }

    // Pelo menos um caractere especial (por exemplo, !@#$%^&*)
    if (!/[!@#$%^&*]/.test(password)) {
      return 'A senha deve conter pelo menos um caractere especial.';
    }

    return null; // A senha atende aos critérios de segurança
  };

  const formatPhoneNumber = (value) => {
    // Remove todos os caracteres não numéricos
    const phoneNumber = value.replace(/\D/g, '');

    // Formata o número de telefone no formato brasileiro
    const formattedPhoneNumber = phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return formattedPhoneNumber;
  };

  const handleTelefoneChange = (e) => {
    setTelefone(formatPhoneNumber(e.target.value));
  };

  const handleCepChange = (e) => {
    // Remove todos os caracteres não numéricos
    const numericCep = e.target.value.replace(/\D/g, '');
    setCep(numericCep);
  };

  const isEmailValid = (email) => {
    // Expressão regular para validar o formato de um email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return (
      nome.trim() !== '' &&
      isEmailValid(email) &&
      !isPasswordSecure(senha) && // Verifica a segurança da senha
      telefone.trim() !== '' &&
      endereco.trim() !== '' &&
      cidade.trim() !== '' &&
      cep.trim() !== ''
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordError = isPasswordSecure(senha);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (!isFormValid()) {
      setError('Preencha todos os campos corretamente.');
      return;
    }

    const response = await fetch(`${APIURL}/api/usuario`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, telefone, endereco, cidade, cep })
    });

    const data = await response.json();

    if (response.status === 400) {
      setError("Email ja cadastrado");
    } else {
      router.push('/auth/login');
    }
  };

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
          Realizar cadastro de comprador
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
                error={!isEmailValid(email)}
                helperText={!isEmailValid(email) ? 'Digite um email válido' : ''}
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
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              {isPasswordSecure(senha) && (
                <Typography variant="body2" color="error">
                  {isPasswordSecure(senha)}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="telefone"
                label="Telefone"
                name="telefone"
                autoComplete="telefone"
                value={telefone}
                onChange={handleTelefoneChange}
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
                onChange={handleCepChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isFormValid()}
              >
                Concluir cadastro
              </Button>
            </Grid>
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  Já tem uma conta? Entre
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

import { useRouter } from 'next/router'
import { useState } from "react";
import Link from 'next/link';
import { Avatar, Box, Button, CssBaseline, Grid, Input, Paper, TextField, Typography } from '@mui/material';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ErrorTypography from '@/components/error';
import { signIn, useSession } from "next-auth/react"
import bg from '../../../../../public/latex_exemplo.jpg'
import Loading from '@/components/Loading';
// Função para validar o formato de email
const isEmailValid = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validação do email
    if (!email) {
      setError('O campo Email é obrigatório.');
      return;
    }

    // Verifica se o formato do email é válido
    if (!isEmailValid(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    // Validação da senha
    if (!senha) {
      setError('O campo Senha é obrigatório.');
      return;
    }

    setIsLoading(true);

    const result = await signIn("admin", {
      email,
      password: senha,
      redirect: false,
      callbackUrl: "/auth/admin"
    });

    console.log(result.error)
    if (result.error) {
      setIsLoading(false);

      setError(result.error);
    } else {
      router.push('/auth/admin');
    }
  };

  return (
    <div>
      {isLoading && <Loading />
      }
      {/* Indicador de carregamento */}
      {!isLoading && (
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${bg.src})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <SupervisorAccountOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant='h5'>
                Login Admin
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='senha'
                  label='Senha'
                  type='password'
                  id='senha'
                  autoComplete='current-password'
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login in
                </Button>
                {error && <ErrorTypography text={error} />}
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>

  )
}

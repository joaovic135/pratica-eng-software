import { useRouter } from 'next/router'
import { useState } from "react";
import Link from 'next/link';
import { Avatar, Box, Button, CircularProgress, CssBaseline, Grid, Input, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ErrorTypography from '@/components/error';
import { signIn, useSession } from "next-auth/react"
import bg from '../../../../public/ceramica_exemplo.jpg'
import Loading from '@/components/Loading';


export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  /*const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/login');
    },
  });*/

  const isEmailValid = (email) => {
    // Expressão regular para verificar o formato do email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar os campos
    if (email.trim() === '') {
      setError('O campo Email é obrigatório.');
      return;
    }

    if (!isEmailValid(email)) {
      setError('O campo Email deve ser preenchido com um email válido.');
      return;
    }

    if (senha.trim() === '') {
      setError('O campo Senha é obrigatório.');
      return;
    }

    setIsLoading(true);

    // Tente fazer o login
    const result = await signIn("credentials", {
      email: email,
      password: senha,
      redirect: false,
    });

    // Verifique o resultado do login
    console.log(result.error)
    if (result.error === 'Usuário não encontrado. Verifique o email e tente novamente.') {
      // Se o erro for "Usuário não encontrado", defina o erro correspondente
      setError('Usuário não encontrado. Verifique o email e senha e tente novamente.');
      setIsLoading(false);
    } else {
      // Redirecione ou faça alguma outra ação de sucesso
      router.push(`/`);
    }

  };

  return (
    <>
      {isLoading && <Loading/>
      }
      {/* Indicador de carregamento */}
      {!isLoading && ( // Renderizar o restante do conteúdo quando não estiver carregando
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
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant='h5'>
                Bem-vindo(a) à tela de login de comprador
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
                  Iniciar sessão
                </Button>
                {error && <ErrorTypography text={error} />}
                <Grid container justifyContent="flex-end">
                  <Grid item xs>
                    <Link href="/auth/lojista/login" variant="body2">
                      Entrar como Lojista
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/auth/signup" variant="body2">
                      Não tem uma conta? Cadastre-se
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  )
}

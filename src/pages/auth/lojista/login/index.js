import { useRouter } from 'next/router'
import { useState } from "react";
import Link from 'next/link';
import { Avatar, Box, Button, CssBaseline, Grid, Input, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ErrorTypography from '@/components/error';
import { signIn, useSession } from "next-auth/react"
import bg from '../../../../../public/artesanato-da-regiao-norte_exemplo.jpg'
import Loading from '@/components/Loading';

export default function Login() {
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

    // Validação da senha
    if (!senha) {
      setError('O campo Senha é obrigatório.');
      return;
    }

    setIsLoading(true);

    // Chama a função de autenticação
    const result = await signIn("lojista", {
      email,
      password: senha,
      redirect: false,
      callbackUrl: "/auth/lojista"
    });

    if (result.error) {
      setIsLoading(false);
      setError(result.error);

    } else {
      router.push('/auth/lojista');
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
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant='h5'>
                Acessar loja
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
                    <Link href="/auth/login" variant="body2">
                      Entrar como Comprador
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/auth/lojista/signup" variant="body2">
                      Não tem uma conta? Cadastre-se
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

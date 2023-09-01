import { useRouter } from 'next/router'
import { useState } from "react";
import Link from 'next/link';
import { Avatar, Box, Button, CssBaseline, Grid, Input, Paper, TextField, Typography } from '@mui/material';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ErrorTypography from '@/components/error';
import { signIn, useSession } from "next-auth/react"


export default function AdminLogin() {
  const router = useRouter()

  const [email, setEmail] = useState([]);
  const [senha, setSenha] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();


    const result = await signIn("admin", {
      email: email,
      password: senha,
      redirect: false, 
      callbackUrl: "/auth/admin" 
    });

    console.log(result)

    if(result.error){
      setError(result.error)
    }else{
      router.push('/auth/admin')
    }
  };



  return (

    <>


      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
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
                value = { email }
                onChange = {(e) => setEmail(e.target.value)}
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
                value = { senha }
                onChange = {(e) => setSenha(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login in
              </Button>
              {error && <ErrorTypography text = {error}/>}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Esqueceu a Senha?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>


      </Grid>

    </>

  )
}



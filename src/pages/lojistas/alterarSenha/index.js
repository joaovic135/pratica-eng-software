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
import { APIURL } from '@/lib/constants';
export default function alterarSenha() {
    
    const router = useRouter();
    const [error, setError] = useState(null);
    const [senha, setSenha] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const { data: session } = useSession();

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

    const isFormValid = () => {
        return (
            senha.trim() !== '' &&
            senhaAtual.trim() !== '' &&
            isPasswordSecure(senha)
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (senha.trim() === '') {
            setError('O campo Senha é obrigatório.');
            return;
        }

        if (!isPasswordSecure(senha)) {
            setError('A senha deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais.');
            return;
        }

        const response = await fetch(`${APIURL}/api/lojista/verificarSenha`, {
            credentials: 'include',
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({     
                id: session.user.lojista.id,
                senhaAtual: senhaAtual })
          });
        
          const data = await response.json();
        
          if (response.status !== 200) {
            setError('Senha atual incorreta. Tente novamente.');
            return;
          }
        
          // A senha atual é válida, você pode enviar a solicitação para alterar a senha
          const alteracaoResponse = await fetch(`${APIURL}/api/lojista/alterarSenha`, {
            credentials: 'include',
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                id: session.user.lojista.id,
                novaSenha: senha })
          });
        
          const alteracaoData = await alteracaoResponse.json();
        
          // Verificar a resposta da alteração de senha e lidar com erros, se houver
          if (alteracaoResponse.status !== 200) {
            setError('Erro ao alterar a senha. Tente novamente mais tarde.');
            return;
          }
        router.push('/auth/lojista')
    }

    if (session) {
        if (1) {
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
                            Alterar Senha
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="senhaAtual"
                                        label="Senha Atual"
                                        name="senhaAtual"
                                        type="password"
                                        value={senhaAtual}
                                        onChange={(e) => setSenhaAtual(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="novaSenha"
                                        label="Nova Senha"
                                        name="novaSenha"
                                        type="password"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={!isFormValid()}
                            >
                                Confirmar Nova Senha
                            </Button>
                            {error && (
                                <Typography variant="body2" color="error">
                                    {error}
                                </Typography>
                            )}
                            <Grid container justifyContent="flex-end">
                                <Grid item></Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            );
        } else {
            return (
                <Forbidden />
            )
        }
    } else {
        return (
            <Forbidden />
        )
    }
}

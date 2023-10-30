import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Grid, Card, CardContent,
 Typography, Button} from '@mui/material';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { persistor } from '@/redux/store';
import AppAppBar from '@/components/appAppBar';

const Pagamento = () => {
    
    const router = useRouter();
    const [sessao, setSession] = useState(null);

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
          return router.push('/auth/login');
        },
    });

    useEffect(() => {
        if (session) {
            setSession(session.user.usuario);
        }
    }
    , [session])
    
    return (
        <div>
            {session && <AppAppBar sessao={session.user.usuario} />}
            <Grid container justifyContent="center">
                <Grid item xs={8}>
                    <Card>
                    <CardContent>
                        <Typography variant="h5" component="div">
                        Informações da Conta
                        </Typography>
                        <Paper elevation={3} style={{ padding: '16px', margin: '8px' }}>
                        <TextField
                            label="Número do Cartão"
                            variant="outlined"
                            fullWidth
                        />
                        </Paper>
                        <Paper elevation={3} style={{ padding: '16px', margin: '8px' }}>
                        <TextField label="Nome" variant="outlined" fullWidth />
                        </Paper>
                        <Paper elevation={3} style={{ padding: '16px', margin: '8px' }}>
                        <TextField
                            label="Endereço"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                        />
                        </Paper>
                        <Paper elevation={3} style={{ padding: '16px', margin: '8px' }}>
                        <TextField
                            label="Número de Segurança"
                            variant="outlined"
                            fullWidth
                        />
                        </Paper>
                        <Paper elevation={3} style={{ padding: '16px', margin: '8px' }}>
                        <TextField
                            label="Data de Validade"
                            variant="outlined"
                            fullWidth
                        />
                        </Paper>
                    </CardContent>
                    </Card>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '16px' }}
                        onClick={() => {
                            persistor.purge()
                            router.push('/checkout');
                        }}
                    >
                    Finalizar Compra
                    </Button>
                </Grid>
            </Grid>
        </div>
      );
}

export default Pagamento;
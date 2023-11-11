import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Grid, Card, CardContent,
 Typography, Button} from '@mui/material';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { persistor } from '@/redux/store';
import { useSelector } from 'react-redux';
import AppAppBar from '@/components/appAppBar';
import { useDispatch } from 'react-redux';

const Pagamento = () => {
    
    const router = useRouter();
    const dispatch = useDispatch();
    const carrinho = useSelector(state => state.carrinho);
    const [historico, setHistorico] = useState([]);

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
    
    const carrinhosItens = carrinho.carrinho.map((item) => {
        return {
            id: item.id,
            idLojista: item.idLojista,
            nomeProduto: item.nome,
            descricao: item.descricao,
            preco: item.preco,
            categoria: item.categoria,
            quantidade: item.quantidade,
        }
    });
    
    console.log(carrinhosItens)
    
    const idComprador = session.user.usuario.id;
    console.log(idComprador)
    
    const criarHistorico = async () => {
        const response = await fetch('/api/historico', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idComprador,
                carrinhosItens,
            }),
        });
        const data = await response.json();
        setHistorico(data);
    }

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
                            criarHistorico()
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
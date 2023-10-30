import AppAppBar from '@/components/appAppBar';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Card, CardContent, Container, Grid } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { removerProduto } from '@/redux/carrinhoSlice';
// import Produto from '@/models/produto';
import { useRouter } from 'next/router';
import { persistor } from '@/redux/store';

function Carrinho() {
    
    const dispatch = useDispatch();
    const router = useRouter();
    const carrinho = useSelector(state => state.carrinho)
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
    
    const handleRemove = (id) => {
        dispatch(removerProduto({id}))
    }

    console.log({carrinho})
    return (
        <div>
            {session && <AppAppBar sessao={session.user.usuario} />}
            <Grid sx={{flexFlow: 1}} container spacing={4}>
                {/* Lista de produtos */}
                    
                <Grid item xs={6}>
                    {/* Mostrar Produtos */}
                    <Card style={{maxWidth: 400, margin: '0 auto', borderRadius: 16}}>
                        <CardContent>
                            <h1>Carrinho</h1>    
                            {carrinho.carrinho.map(produto => <li className='list-group-item' key={produto.id}>
                                <>
                                    <Card style={{maxWidth: 400, margin: '0 auto', borderRadius: 16}}>
                                        <Grid>
                                            <h3>Nome {produto.nome}</h3>
                                            <p>Valor {produto.preco}</p>
                                            <p>Quantidade x{produto.quantidade}</p>
                                            
                                        </Grid>

                                        <Grid>
                                            <Button varaint="contained" color='error'
                                                onClick={() => {
                                                    handleRemove(produto.id)
                                                }
                                            }>x</Button>
                                        </Grid>
                                    </Card>
                                    <br />
                                </>  
                            </li>)} 
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={4}>
                    <Card style={{maxWidth: 400, margin: '0 auto', borderRadius: 16}}>
                        {/* Mostrar valor total */}
                        <CardContent>Total : {carrinho.total}</CardContent>

                        {/* Botão de finalizar compras */}
                        <CardContent>
                            <Card style={{maxWidth: 400, margin: '0 auto', borderRadius: 16}}>
                                <Button onClick={
                                    () => {
                                        if (carrinho.length > 0) {
                                            persistor.purge()
                                            router.push(`/checkout`)
                                        } else {
                                            console.log('Carrinho vazio')
                                        }
                                    }
                                
                                } varaint="contained" color="success">Finalizar Compra</Button>
                            </Card>
                            </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Carrinho;

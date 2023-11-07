import AppAppBar from '@/components/appAppBar';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useEffect } from 'react';
// import Produto from '@/models/produto';
import { useRouter } from 'next/router';

function Checkout() {
    
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
    function handleCheckOut() {
        router.push('/')
    }
    return (
        <div>
            {session && <AppAppBar sessao={session.user.usuario} />}
            <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4">Checkout</Typography>
                    <Typography variant="h5">Compra realizada com sucesso!</Typography>

                    <Card style={{ maxWidth: 400, margin: '20px auto', borderRadius: 16 }}>
                    <CardContent>
                        Sua compra foi realizada com sucesso!
                    </CardContent>
                    </Card>

                    <Button variant="contained" onClick={handleCheckOut} sx={{ marginTop: 2 }}>
                    Voltar para a loja
                    </Button>
                </div>
            </CardContent>
        </div>
    );
}

export default Checkout;
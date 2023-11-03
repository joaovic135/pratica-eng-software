import AppAppBar from '@/components/appAppBar';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, IconButton, Divider } from '@mui/material';
import { Card, CardContent, CardActionArea, Grid } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { removerProduto } from '@/redux/carrinhoSlice';
import { useRouter } from 'next/router';
import Typography from '@/components/typography';
import DeleteIcon from '@mui/icons-material/Delete';

function Carrinho() {
  const dispatch = useDispatch();
  const router = useRouter();
  const carrinho = useSelector(state => state.carrinho);
  const [sessao, setSession] = useState(null);
  const [frete, setFrete] = useState(0);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/login');
    },
  });

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    if (session) {
      setSession(session.user.usuario);
    }
    setFrete(randomNumberInRange(1, 20));
  }, [session]);

  const handleRemove = id => {
    dispatch(removerProduto({ id }));
  };

  // Calcular o subtotal
  const subtotal = carrinho.carrinho.reduce(
    (acc, produto) => acc + produto.preco * produto.quantidade,
    0
  );

  // Calcular o total
  const total = subtotal + frete;

  // Calcular a quantidade total de itens no carrinho
  const quantidadeItens = carrinho.carrinho.reduce(
    (acc, produto) => acc + produto.quantidade,
    0
  );

  return (
    <div>
      {session && <AppAppBar sessao={session.user.usuario} />}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '16px',
            }}
          >
            <h1 style={{ margin: '10px' }}>Carrinho de Compras</h1>
            <p style={{ marginLeft: '10px', margin: '0' }}>
              ({quantidadeItens} itens)
            </p>
          </div>
          <Divider
            variant="middle"
            style={{
              margin: '16px 0',
              height: '4px',
              backgroundColor: '#000000', // Cor do Divider
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Card style={{ maxWidth: 800, margin: '0 auto', borderRadius: 16 }}>
            <CardContent>
              {carrinho.carrinho.map(produto => (
                <li className="list-group-item" key={produto.id}>
                  <Card sx={{ maxWidth: 800, marginBottom: '20px' }}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Nome {produto.nome}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Valor {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Quantidade x{produto.quantidade}
                        </Typography>
                        <Grid>
                          <IconButton
                            aria-label="delete"
                            color="error"
                            size="large"
                            onClick={() => {
                              handleRemove(produto.id);
                            }}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </li>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={{ maxWidth: 500, margin: '0 auto', borderRadius: 16 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <Box sx={{ fontWeight: 'regular', m: 1 }}>Resumo do pedido</Box>
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                <Box sx={{ fontWeight: 'regular', m: 1 }}>
                  Subtotal : {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Box>
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                <Box sx={{ fontWeight: 'regular', m: 1 }}>
                  Frete : {frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Box>
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                <Box sx={{ fontWeight: 'bold', m: 1 }}>
                  Total : {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Box>
              </Typography>
              <Button
                onClick={() => {
                  if (carrinho.carrinho.length > 0) {
                    router.push(`/carrinho/pagamento`);
                  } else {
                    console.log('Carrinho vazio');
                  }
                }}
                variant="contained"
                color="success"
              >
                Finalizar Compra
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Carrinho;

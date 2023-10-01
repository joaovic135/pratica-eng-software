import { useSession, signIn, signOut } from "next-auth/react"
import AppFooter from '@/components/appFooter'
import AppAppBar from '@/components/appAppBar'
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import TextField from '@mui/material/TextField';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function PaginaProduto() {
  return (
    <>
      <AppAppBar></AppAppBar>
      <Typography>
        <Box sx={{ width: '100%'}}>
              <div style={{ display:'flex', justifyContent:'center' }}>
                <Item>
                  <Stack //categorias
                          direction="row"
                          divider={<Divider orientation="vertical" flexItem />}
                          spacing={1}
                        >
                          <Item>Página Inicial -~ teste</Item>
                          <Item></Item>
                          <Item>Itens decorativos</Item>
                          <Item>Artesanato com reciclagem</Item>
                          <Item>Plástico</Item>
                          <Item>Vaso de flor de garrafa PET</Item>
                  </Stack>
              </Item>
              </div>
              
              <div style={{ display:'flex', justifyContent:'center' }}>
                
                <Card 
                  raised
                  sx={{ 
                    height: '90ch', 
                    margin: 15, 
                    width: '150ch'
                  }}
                >
                  
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ marginTop: 50, marginLeft: 100 }}>
                      <CardMedia //, maxWidth: 400 
                        sx={{ maxWidth: 400 }}
                        component="img"
                        image="fribras_exemplo.jpg"
                      />
                    </div>
                    <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <div style={{ marginTop: 25, marginLeft: 150 }}>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            flexDirection: 'column'
                          }}>

                          <CardContent>
                            <h2>Vaso de flor de garrafa PET</h2>
                            <h6>Vendido por Mundo Artesanal</h6>
                            <br></br>
                            <h1>R$13,00</h1>
                            <h7>Em estoque (25 disponíveis)</h7>
                            <br></br>
                            <br></br>
                            <CardActions> </CardActions>
                            <Button variant="outlined" startIcon={<ShoppingCartRounded />}>
                                Adicionar ao carrinho
                            </Button>
                          </CardContent>
                          

                          
                        </Box>
                      </div>
                    </Box>
                      
                    </CardContent>
                  </Box>
                  <div style={{marginLeft: 100 }}>
                    <Stack spacing={2}>
                      <Pagination count={10}/>
                    </Stack>
                  </div>  
                  <CardActions>
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { ml: 2, width: '144ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="outlined-multiline-static"
                          label="Descrição"
                          multiline
                          rows={15}
                        />
                      </div>
                    </Box>
                  </CardActions>
                </Card>
              </div>
        </Box>
      </Typography>
      <AppFooter></AppFooter>
    </>
  );
}
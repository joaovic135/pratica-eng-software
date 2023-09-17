import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, createTheme, Image, Tab } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { useState } from "react";
import Modal from '@mui/material/Modal';
import AppAppBar from '@/components/appAppBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




export default function Lojista() {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false);
  const [lojista, setLojista] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/admin/login')
    },
  })




  const { id } = router.query

  console.log(id)



  useEffect(() => {
    fetch("http://localhost:3000/api/lojista/?id=" + id , {
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(json => {
        setLojista(json)
        setProdutos(json.Produtos)
      })
  }, [])

  if (!lojista) return null


  console.log(lojista)
  return (


    <div style={{ height: 400, width: '100%' }}>
      <AppAppBar></AppAppBar>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Categoria</TableCell>
              <TableCell align="center">Estoque</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {lojista.Produtos?.map((produto) => produto && (
              <TableRow
                key={...produto.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row"> {produto.nome}</TableCell>
                <TableCell align="left">{produto.descricao}</TableCell>
                <TableCell align="right">{produto.preco}</TableCell>
                <TableCell align="right">{produto.categoria}</TableCell>
                <TableCell align="right">{produto.estoque}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => router.back()} variant="contained">Voltar</Button>

    </div>



  )

}


Lojista.auth = true

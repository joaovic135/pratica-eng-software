import { Button, Card, CardContent, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { useState } from "react";

export default function Produto() {
  const router = useRouter()
  const [produto, setProduto] = useState([]);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/lojista/login')
    },
  })
  console.log(session)

  const idLojista = session.user.lojista.id
  const { id } = router.query

  console.log(id)



  useEffect(() => {
    fetch("http://localhost:3000/api/produto/?id=" + id + "&idLojista=" + idLojista, {
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(json => { setProduto(json) })
  }, [])


  const handleEditClick = () => {
    // Implemente a lógica para editar o produto aqui
  };

  const handleDeleteClick = () => {
    // Implemente a lógica para deletar o produto aqui
  };
  
  console.log(produto)

  return (

    <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {produto.nome}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Descrição: {produto.descricao}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Preço: R${produto.preco}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Categoria: {produto.categoria}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Estoque: {produto.estoque}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Editar
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteClick}>
            Deletar
          </Button>
        </CardContent>
      </Card>

    </>

  )
}


Produto.auth = true

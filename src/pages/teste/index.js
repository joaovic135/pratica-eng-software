import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, FormControl, TextField, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Modal from '@mui/material/Modal';
import AppAppBar from '@/components/appAppBar';


export default function EditProductScreen() {
  const [produto, setProduto] = useState([]);
  const [nome, setNome] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const [preco, setPreco] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [estoque, setEstoque] = useState([]);

  const router = useRouter()

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/lojista/login')
    },
  })

  const { id } = router.query

}
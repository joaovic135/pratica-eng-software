import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, FormControl, TextField, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Modal from '@mui/material/Modal';
import AppAppBar from '@/components/appAppBar';
import { APIURL } from '@/lib/constants';


export default function EditProductScreen() {
  const [produto, setProduto] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter()
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [estoque, setEstoque] = useState('');
  const [descricao, setDescricao] = useState('');

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/lojista/login')
    },
  })

  const idLojista = session.user.lojista.id
  const { id } = router.query

  const formatNumber = (value) => {
    // Remove todos os caracteres não numéricos
    const justNumber = value.replace(/\D/g, '');

    return justNumber ;
  };
  const formatPreco = (value) => {
    // Remove todos os caracteres não numéricos
    const precoFormated = value.replace(/[^\d.]/g, '');

    return precoFormated ;
  };

  const handlePreco = (e) => {
    setPreco(formatPreco(e.target.value));
  };

  const handleEstoque = (e) => {
    setEstoque(formatNumber(e.target.value));
  };

  const isNumberValid=(value)=>{
    return !isNaN(value) && value > 0;
    
  }

  const formatCategoria=(value)=>{
    const categoriaString=value.replace(/\d/g, '');

    return categoriaString;
  }
  const handleCategoria = (e) => {
    setCategoria(formatCategoria(e.target.value));
  };


  useEffect(() => {
    fetch(`${APIURL}/api/produto/?id=${id}&idLojista=${idLojista}`, {
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(json => {
        setProduto(json.produto)
        setNome(json.produto.nome)
        setDescricao(json.produto.descricao)
        setPreco(json.produto.preco)
        setCategoria(json.produto.categoria)
        setEstoque(json.produto.estoque)
      })
  }, [])


  //preco = preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nome.trim() === '') {
      setError('O campo Nome é obrigatório.');
      return;
    }

    if (preco === '' || !isNumberValid(preco)) {
      setError('O campo Preço é obrigatório e deve ser preenchido com um valor maior que 0.');
      return;
    }
    
    if (categoria.trim()===''){
      setError('O campo Categoria é obrigatório.');
      return;
    }
    if(estoque ===''|| !isNumberValid(estoque)){
      setError('O campo Estoque é obrigatorio e deve ser preenchido com um valor maior que 0.')
      return;
    }
    if (descricao.trim() === '') {
      setError('O campo Descrição é obrigatório.');
      return;
    }

    const response = await fetch(`${APIURL}/api/produto/edit/?id=${id}&idLojista=${idLojista}`, {
      credentials: 'include',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, descricao, preco, categoria, estoque })
    })
    // Chame a função onSave com o produto editado
    const data = await response.json()
    const { error } = data
    if (response.status === 401) return setError(error)
    router.push('/produto/lojista/' + id)
  };

  const inputStyle = {
    marginBottom: '25px',
    width: '100%',
  };
  return (
    <>
      <AppAppBar />
      <Box
        component="form"
        sx={{ display: 'flex', justifyContent: 'center' }}
        noValidate
        autoComplete="off"
      >

        <FormControl sx={{width: '45%' , marginTop:'20px'}}>
          <Typography variant="h5" component="div" style={inputStyle}>
            Editar Produto
          </Typography>
          <TextField
            id="outlined-controlled"
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={inputStyle}
          />
          <TextField
            name="descricao"
            label="Descrição"
            variant="outlined"
            fullWidth
            multiline
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={inputStyle}
          />
          <TextField
            name="preco"
            label="Preço"
            variant="outlined"
            fullWidth
            value={preco}//{preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            onChange={handlePreco}
            style={inputStyle}
          />
          <TextField
            name="categoria"
            label="Categoria"
            variant="outlined"
            fullWidth
            value={categoria}
            onChange={handleCategoria}
            style={inputStyle}
          />
          <TextField
            name="estoque"
            label="Estoque"
            type="number"
            variant="outlined"
            fullWidth
            value={estoque}
            onChange={handleEstoque}
            style={inputStyle}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{padding: '10px'}}>
            Salvar
          </Button>
          {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        </FormControl>
      </Box>
    </>
  );
}

EditProductScreen.auth = true
import Typography from '@/components/typography';
import { Button, Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { APIURL } from '@/lib/constants';
import { useSession } from 'next-auth/react';
import ErrorTypography from '@/components/error';
import { useRouter } from 'next/router';
import AppAppBar from '@/components/appAppBar';
import { parse } from 'date-fns';
import { useEffect } from 'react';
import Loading from '@/components/Loading';

export default function CriarLeilao() {
  const router = useRouter();
  const [leilao, setLeilao] = useState({
    nomeLeilao: '',
    dataInicio: '',
    dataFim: '',
    lojistaId:'',
  });
  const [error, setError] = useState(null);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [sessao, setSession] = useState(null);
  const [idLojista, setIdLojista] = useState(null);
  const [produto, setProduto] = useState({
    nomeProduto: '',
    descricaoProduto: '',
    valorInicialProduto: '',
    lojistaId: '',
  });

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/lojista/login')
    },
  });

  useEffect(() => {
    if (session) {
      setSession(session.user.lojista);
      setIdLojista(session.user.lojista.id);
      setLeilao({ ...leilao, lojistaId: idLojista });
      setProduto({ ...produto, lojistaId: idLojista });
    }
    if (sessao == null) {
      console.log(session)
      if (session){
        setSession(session.user.lojista);
      }
    }
  }, [session])
  if (!session) {
    return <div><Loading></Loading></div>;
  }

  const handleDataInicio = (e) => {
    setDataInicio(e.target.value);
  };

  const handleDataFim = (e) => {
    setDataFim(e.target.value);
  }


  const handleLeilaoChange = (e) => {
    const { name, value } = e.target;
    setLeilao({ ...leilao, [name]: value });
  };

  const parseDate = (dateString) => {
    try {
      return parse(dateString, 'yyyy-MM-dd', new Date());
    } catch (error) {
      return null;
    }
  };

  const handleProdutoChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const validateDates = () => {
    const parsedDataInicio = parseDate(dataInicio);
    const parsedDataFim = parseDate(dataFim);

    if (!parsedDataInicio || !parsedDataFim) {
      setError('Datas inválidas.');
      return false;
    }

    if (parsedDataInicio >= parsedDataFim) {
      setError('A data de início deve ser anterior à data de fim.');
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (leilao.nomeLeilao === '') {
      setError('O campo Nome do Leilão é obrigatório.');
      return;
    }
    if (dataInicio === '') {
      setError('O campo Data de Início é obrigatório.');
      return;

    }
    if (!dataFim) {
      setError('O campo Data de Fim é obrigatório.');
      return;

    }
    if (produto.nomeProduto === '') {
      setError('O campo Nome do Produto é obrigatório.');
      return;

    }
    if (produto.descricaoProduto === '') {
      setError('O campo Descrição do Produto é obrigatório.');
      return;

    }
    if (produto.valorInicialProduto === '') {
      setError('O campo Valor Inicial do Produto é obrigatório.');
      return;

    } else if (isNaN(parseFloat(produto.valorInicialProduto))) {
      setError('O campo Valor Inicial do Produto deve ser um número.');
      return;

    }

    if (!validateDates()) {
      return;
    }

    try {
      const formattedLeilao = {
        ...leilao,
        dataInicio: dataInicio,
        dataFim: dataFim,
        lojistaId: session.user.lojista.id,
      };
      console.log(session.user.lojista.id)
      console.log(formattedLeilao.lojistaId)
      const response = await fetch(`${APIURL}/api/leilao/criar/?idLojista=${formattedLeilao.lojistaId}`, {
        method: 'POST',
        body: JSON.stringify({ leilao: formattedLeilao, produto }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        const data = await response.json();
        console.log(data)
        window.alert('Leilão criado com sucesso!');
        window.location.href = `/leilao/${data}`;
      } else {
        const data = await response.json();
        const { error } = data;
    
        console.log('Erro ao criar leilão',error);
      }
    } catch (error) {
      setError(error.message);
      return;

    }
  };

  return (
    <>
      <AppAppBar sessao={sessao} />

      <Container>
        <Typography variant="h4" gutterBottom>
          Criar um Leilão
        </Typography>
        <form onSubmit={handleSubmit} noValidate> {/* Adicione o atributo noValidate para desabilitar a validação padrão do HTML */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="nomeLeilao"
                label="Nome do Leilão"
                variant="outlined"
                fullWidth
                value={leilao.nomeLeilao}
                onChange={handleLeilaoChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="date"
                label="Data de Inicio"
                InputLabelProps={{ shrink: true }}
                value={dataInicio}
                onChange={handleDataInicio}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="date"
                label="Data de Fim"
                InputLabelProps={{ shrink: true }}
                value={dataFim}
                onChange={handleDataFim}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="nomeProduto"
                label="Nome do Produto"
                variant="outlined"
                fullWidth
                value={produto.nomeProduto}
                onChange={handleProdutoChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="descricaoProduto"
                label="Descrição do Produto"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={produto.descricaoProduto}
                onChange={handleProdutoChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="valorInicialProduto"
                label="Valor Inicial do Produto"
                type="number"
                variant="outlined"
                fullWidth
                value={produto.valorInicialProduto}
                onChange={handleProdutoChange}
              />
            </Grid>
            <Grid item xs={12}>
              {error && <ErrorTypography text={error} />}
              <Button type="submit" variant="contained" color="primary">
                Criar Leilão
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

CriarLeilao.auth = true;

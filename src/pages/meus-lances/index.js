import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  IconButton,
  Collapse,
  TextField,
  Badge,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Loading from '@/components/Loading';
import { APIURL } from '@/lib/constants';
import AppAppBar from '@/components/appAppBar';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { format } from 'date-fns';


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link href={`/leilao/${row.leilaoId}`}>
            {row.nomeProduto}
          </Link>
        </TableCell>
        <TableCell align="left">{row.lanceAtual}</TableCell>
        <TableCell align='left'>
          <Badge
            badgeContent={row.encerrado ? 'Encerrado' : 'Aberto'}
            color={row.encerrado ? 'error' : 'success'}
            align="center"
          />
        </TableCell>
        <TableCell align="left">{formatDate(row.dataInicio)}</TableCell>
        <TableCell align="left">{formatDate(row.dataFim)}</TableCell>
        <TableCell align="left">
          {row.isLanceAtualDoComprador ? (
            <Typography variant="body2" color="primary">
              Lance Atual é do Comprador
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary">
              O Lance Atual não é do Comprador
            </Typography>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Histórico de Lances do Comprador
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID do Lance</TableCell>
                    <TableCell>Valor do Lance</TableCell>
                    <TableCell>Data de Criação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.historicoLancesDoComprador.map((historico) => (
                    <TableRow key={historico.id}>
                      <TableCell>{historico.id}</TableCell>
                      <TableCell>{historico.valorLance}</TableCell>
                      <TableCell>{formatDate(historico.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    leilaoId: PropTypes.number.isRequired,
    nomeProduto: PropTypes.string.isRequired,
    lanceAtual: PropTypes.string.isRequired,
    dataInicio: PropTypes.string.isRequired,
    dataFim: PropTypes.string.isRequired,
    isLanceAtualDoComprador: PropTypes.bool.isRequired,
    historicoLancesDoComprador: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        valorLance: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      })
    ).isRequired,
    encerrado: PropTypes.bool.isRequired,
  }).isRequired,
};

const CompradorLeiloes = () => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/login');
    },
  });

  const [leiloes, setLeiloes] = useState(null);
  const [sessao, setSession] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (session) {
      setSession(session.user.usuario);

      fetch(`${APIURL}/api/meus-lances/?compradorId=${session.user.usuario.id}`, {
        method: 'GET',
      })
        .then((resp) => {
          if (resp.status !== 200) {
            console.error('Produto não encontrado');
          } else {
            return resp.json();
          }
        })
        .then((json) => {
          if (json) {
            // Adicione a lógica para calcular se o leilão está encerrado
            const now = new Date();
            json = json.map((leilao) => ({
              ...leilao,
              encerrado: now > new Date(leilao.dataFim),
            }));
            setLeiloes(json);
            console.log(json)
          }
        });
    }
  }, [session]);

  useEffect(() => {
    if (leiloes) {
      const results = leiloes.filter((row) =>
        row.nomeProduto.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm, leiloes]);

  const handleSort = (columnName) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

    const sortedLeiloes = [...leiloes].sort((a, b) => {
      const comparison = a[columnName].localeCompare(b[columnName]);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setLeiloes(sortedLeiloes);
  };

  if (!leiloes) {
    return <div><Loading></Loading></div>;
  }

  return (
    <>
      <AppAppBar sessao={sessao} />
      <TextField
        label="Pesquisar por nome do produto"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '20px' }}
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell
                onClick={() => handleSort('nomeProduto')}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                Nome do Produto
                <IconButton size="small">
                  {sortOrder === 'asc' ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowUpIcon />
                  )}
                </IconButton>
              </TableCell>
              <TableCell>
                Lance Atual
              </TableCell>
              <TableCell>
                Status
              </TableCell>
              <TableCell>
                Data de Início
              </TableCell>
              <TableCell>
                Data de Fim
              </TableCell>
              <TableCell>
              Lance do comprador
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchTerm ? (
              searchResults.map((row) => (
                <Row key={row.leilaoId} row={row} />
              ))
            ) : (
              leiloes.map((row) => (
                <Row key={row.leilaoId} row={row} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CompradorLeiloes;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  TextField,
} from "@mui/material";
import { APIURL } from '@/lib/constants';
import { useSession } from 'next-auth/react';
import AppAppBar from '@/components/appAppBar';
import AppSidebar from '@/components/AppSidebar';
import AppHeader from '@/components/AppHeader';
import Loading from '@/components/Loading';

function EditarLeilao() {
  const router = useRouter();
  const { id } = router.query;
  const [leilao, setLeilao] = useState({});
  const [sessao, setSession] = useState(null);
  const [nome, setNome] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/login');
    },
  });

  useEffect(() => {
    if (session) {
      setSession(session);
    }
    if (id) {
      fetch(`${APIURL}/api/admin/leilao/editar?id=${id}`)
        .then((resp) => {
          if (resp.status !== 200) {
            console.error('Leilão não encontrado');
          } else {
            return resp.json();
          }
        })
        .then((json) => {
          setLeilao(json);
          setNome(json.nome);
          setDataInicio(json.dataInicio);
          setDataFim(json.dataFim);
          console.log(json);
        });
    }
  }, [id], [session]);

  const handleUpdateLeilao = () => {
    fetch(`${APIURL}/api/admin/leilao/editar?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, dataInicio, dataFim }),
    })
      .then((response) => {
        if (response.status === 200) {
          router.push('/leilao/admin/listar');
        }
      });
  };

  if (!session) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <AppAppBar sessao={session.user.usuario} />
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <h1>Editar Leilão ID: {id}</h1>

          <div className="d-flex flex-column p-3">
            <TextField
              autoComplete="nome-dado"
              name="nome"
              required
              label="Nome"
              autoFocus
              InputLabelProps={{ shrink: true }}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mb-3"
            />

            <TextField
              name="DataInicio"
              required
              label="Data de inicio"
              autoFocus
              InputLabelProps={{ shrink: true }}
              value={leilao.dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="mb-3"
            />

            <TextField
              name="DataFim"
              required
              label="Data de Fim"
              autoFocus
              InputLabelProps={{ shrink: true }}
              value={leilao.dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="mb-3"
            />

            <Button variant="contained" color="primary" onClick={handleUpdateLeilao} className="mt-3">
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>
    </div>


  );
}

export default EditarLeilao;

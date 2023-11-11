import AppAppBar from '@/components/appAppBar';
import { APIURL } from '@/lib/constants';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Loading from '@/components/Loading';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  TextField,
  createTheme,
} from '@mui/material';
import Link from 'next/link';
import Chart from '@/components/Chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Typography from '@/components/typography';

function DetalhesLeilao() {
  const router = useRouter();
  const [lance, setLance] = useState(0);
  const [leilao, setLeilao] = useState(null);
  const [compradores, setCompradores] = useState([]);
  const [sessao, setSession] = useState(null);
  const [item, setItem] = useState({});
  const [idComprador, setIdComprador] = useState(null);
  const { id } = router.query;
  const [valorMinimoLance, setValorMinimoLance] = useState(0);
  const [valorAtual, setValorAtual] = useState(0);
  const [dataInicioFormatada, setDataInicioFormatada] = useState(null);
  const [dataFimFormatada, setDataFimFormatada] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [chartData, setChartData] = useState([]);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/lojista/login');
    },
  });

  const theme = createTheme();

  const card = {
    height: '100ch',
    width: '130ch',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
  };

  const description = {
    marginBottom: theme.spacing(2),
    textAlign: 'justify',
    ml: 2,
    height: '40ch',
    margin: 5,
    width: '121ch',
  };

  useEffect(() => {
    if (id) {
      if (session) {
        if (session.user.lojista) {
          setIdComprador(session.user.lojista.id);
          setSession(session.user.lojista);
        } else {
          setIdComprador(session.user.usuario.id);
          setSession(session.user.usuario);
        }
      }

      fetch(`${APIURL}/api/leilao/?id=${id}`, {
        method: 'GET',
      })
        .then((resp) => {
          if (resp.status !== 200) {
            router.push('/error');
            console.error('Leilão não encontrado');
          } else {
            return resp.json();
          }
        })
        .then((json) => {
          if (json) {
            console.log(json);
            setLeilao(json.Leilao);
            setItem(json.ItemLeilao);
            const valorAtual = parseFloat(json.ItemLeilao.valorAtual);
            const valorMinimo = valorAtual + 1;
            setValorMinimoLance(valorMinimo);
            setLance(parseFloat(valorMinimo));
            setDataInicioFormatada(format(new Date(json.Leilao.dataInicio), 'dd-MM-yyyy'));
            setDataFimFormatada(format(new Date(json.Leilao.dataFim), 'dd-MM-yyyy'));
            setValorAtual(valorAtual);

            setCompradores(json.CompradoresLances);

            const formattedChartData = json.TodosLances.map((lance) => ({
              data: format(new Date(lance.createdAt), 'dd/MM/yyyy HH:mm:ss'),
              valor: lance.valorLance,
              userId: lance.compradorId,
            }));
            setChartData(formattedChartData);
          }
        })
        .catch((error) => {
          console.error('Erro na requisição:', error);
        });
    }
  }, [id, session]);

  let userType = 'comprador';
  if (session && session.user.lojista) {
    userType = 'lojista';
  }

  const handleBid = async () => {
    setIsLoading(true);

    if (userType === 'comprador') {
      try {
        const response = await fetch(`${APIURL}/api/leilao/${id}/dar-lance/?idComprador=${idComprador}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lance }),
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          setOpenModal(true);
        } else {
          const data = await response.json();
          const { error } = data;
          console.error('Erro ao dar lance', error);
        }
      } catch (e) {
        console.log(e);
      }
    }

    setIsLoading(false);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    router.reload();
  }
  const handleListarLeiloes =()=>{
    setOpenModal(false);
    router.push("/meus-lances")
  }
  if (!leilao) {
    return <div><Loading /></div>;
  }

  function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
      const lance = payload[0].payload;
      const { data, valor, userId } = lance;
      const comprador = compradores.find((c) => c.id === userId);

      return (
        <div className="custom-tooltip">
          <p>Data: {data}</p>
          <p>Valor do Lance: R${valor}</p>
          {comprador && <p>Comprador: {comprador.nome}</p>}
        </div>
      );
    }

    return null;
  }


  return (
    <div>
      <AppAppBar sessao={sessao} />

      <Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Box sx={{
            marginTop: theme.spacing(2),
            width: '130ch',
          }}>
            <Typography variant="body1">
              <Link href="/" color="inherit">
                Página Inicial
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card raised sx={card}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginTop: 50, marginLeft: 100 }}>
                  <CardMedia
                    sx={{ maxWidth: 400 }}
                    component="img"
                    image="/latex_exemplo.jpg"
                  />
                </div>
                <CardContent>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    m: 1,
                    marginLeft: 10,
                  }}>
                    <div style={{ marginTop: 0, marginLeft: 0 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {leilao.nome}
                      </Typography>
                      <Typography gutterBottom variant="h7" component="div">
                        Descrição do Item: {item.descricao}
                      </Typography>
                      <Typography gutterBottom variant="h7" component="div">
                        Valor Inicial: R${item.valorInicial}
                      </Typography>

                      <Typography gutterBottom variant="h7" component="div">
                        Data de início do leilão: {dataInicioFormatada}
                      </Typography>
                      <Typography gutterBottom variant="h7" component="div">
                        Data de fim do leilão: {dataFimFormatada}
                      </Typography>

                      {userType === 'comprador' && (
                        <div>
                          <Typography gutterBottom variant="h7" component="div">Seja bem-vindo, {sessao.nome}!</Typography>
                          <Typography gutterBottom variant="h7" component="div">Lance atual: R${item.valorAtual}</Typography>
                          <Typography gutterBottom variant="h7" component="div">Lance Mínimo: R${valorMinimoLance}</Typography>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <TextField
                              type="number"
                              id="lance"
                              value={lance}
                              min={valorMinimoLance}
                              onChange={(e) => setLance(parseFloat(e.target.value))}
                              style={{ flex: 1 }}
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleBid}
                              disabled={isLoading}
                              style={{ flex: 'none', height: '100%' }}
                            >
                              Dar Lance
                            </Button>
                          </div>
                        </div>
                      )}

                      {userType === 'lojista' && (
                        <div>
                          <p>Você está logado como um lojista.</p>
                        </div>
                      )}
                    </div>
                  </Box>
                </CardContent>
              </Box>

              <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Lance Realizado</DialogTitle>
                <DialogContent>
                  <DialogContentText>Seu lance foi feito com sucesso.</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal} color="primary">
                    Fechar
                  </Button>
                  <Button onClick={handleListarLeiloes} color="primary">
                    Ver Todos os Lances
                  </Button>
                </DialogActions>
              </Dialog>

              <Box sx={{
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(-5),
                ml: 5,
                width: '150ch',
                padding: '16px',
              }}>
                <Typography variant="h3">
                  Histórico de Lances
                </Typography>
              </Box>
              <Card variant="outlined" sx={description}>
                <ResponsiveContainer width="100%" height={300} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <LineChart data={chartData}>
                    <XAxis dataKey="data" />
                    <YAxis domain={[0, valorAtual]} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<CustomTooltip />}
                      wrapperStyle={{
                        background: 'white',
                        border: '1px solid #888',
                        padding: '8px',
                        color: '#000',
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="valor" stroke="#8884d8" activeDot={{ r: 10 }}  strokeWidth={4}/>
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Card>
          </div>
        </Box>
      </Box>
    </div>
  );
}

DetalhesLeilao.auth = true;

export default DetalhesLeilao;

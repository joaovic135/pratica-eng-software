import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import { APIURL } from "@/lib/constants";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import AppAppBar from "@/components/appAppBar";
import AppFooter from "@/components/appFooter";
import { format } from "date-fns";

function ListarLeiloes() {
  const router = useRouter()

  const [sessao, setSession] = useState(null);
  const [Leiloes, setLeiloes] = useState(null);
  const [selectedLeilao, setSelectedLeilao] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/login');
    },
  }); 
  
  const handleEditClick = (id) => {
    router.push(`/leilao/admin/editar/${id}`);
  };

  const handleDeleteClick = (id) => {
    setSelectedLeilao(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);

    fetch(`${APIURL}/api/admin/leilao?id=${selectedLeilao}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.status === 204) {
          router.reload();
        } else {
          console.error("Falha ao excluir o leilão");
        }
      });
  };

  useEffect(() => {
    if (session) {
      setSession(session.user.usuario);
    }
    fetch(`${APIURL}/api/admin/leilao/`, {
      method: 'GET',
    })
      .then((resp) => {
        if (resp.status !== 200) {
          console.error('Leilão não encontrado');
        } else {
          return resp.json();
        }
      })
      .then((json) => {
        setLeiloes(json)
        console.log(json)
      })
    console.log("oi")
  }, [session]);

  if (!Leiloes) {
    return <Loading />
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'nomeLeilao', headerName: 'Nome', width: 250 },
    { field: 'nomeLojista', headerName: 'Lojista', width: 300 },
    { field: 'nomeProduto', headerName: 'Produto', width: 200 },
    {
      field: 'leilaoInicio',
      headerName: 'Início',
      width: 100,
      valueFormatter: (params) =>
        format(new Date(params.value), "dd/MM/yyyy "),
    },
    {
      field: 'leilaoFinal',
      headerName: 'Final',
      width: 100,
      valueFormatter: (params) =>
        format(new Date(params.value), "dd/MM/yyyy "),
    },
    {
      field: 'itemLeilaoValorInicial',
      headerName: 'Valor Inicial',
      width: 130,
      valueFormatter: (params) =>
        new Number(params.value).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
    },
    {
      field: 'itemLeilaoValorAtual',
      headerName: 'Valor Atual',
      width: 130,
      valueFormatter: (params) =>
        new Number(params.value).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
    },
  ];
  
  return (
    <>
      <AppAppBar sessao={session.user.usuario} />
      <AppSidebar />
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            {Leiloes !== null && Leiloes.length > 0 ? (
              <div style={{ height: 400, width: "100%" }}>
                <Button onClick={() => router.back()} variant="contained">
                  Voltar
                </Button>
                <DataGrid
                  rows={Leiloes}
                  columns={[
                    ...columns,
                    {
                      field: "actions",
                      headerName: "Ações",
                      width: 130,
                      renderCell: (params) => (
                        <div>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditClick(params.row.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteClick(params.row.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      ),
                    },
                  ]}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              </div>
            ) : (
              <p><Loading /></p>
            )}

          </div>
          <AppFooter />
        </div>
        <Modal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              p: 3,
            }}
          >
            <h3>Tem certeza que deseja excluir este leilão?</h3>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteConfirm}
            >
              Sim, excluir
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
          </Box>
        </Modal>
      </div>


    </>
  )

}


ListarLeiloes.auth = true
export default ListarLeiloes
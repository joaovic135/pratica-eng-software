import Forbidden from '@/components/Forbidden';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AppAppBar from '@/components/appAppBar'
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import { APIURL } from '../../lib/constants';

const MatEdit = ({ id }) => {
  const router = useRouter();


  const handleDeleteClick = (event) => {
    event.stopPropagation();
    fetch(`http://localhost:3000/api/lojistas/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();

        } 
        else {
      }
      })
      .catch((error) => {
        console.error('Erro ao excluir lojista:', error);
      });
  };
  const handleEditClick = (event) => {
    event.stopPropagation();
    router.push(`/lojistas/edit/${id}`);
  };

  return (
    <>
    <FormControlLabel
      control={
        <IconButton color="secondary" aria-label="delete" onClick={handleDeleteClick}>
          <DeleteIcon style={{ color: blue[500] }} />
        </IconButton>
      }
    />
    <FormControlLabel
      control={
        <IconButton color="secondary" aria-label="edit" onClick={handleEditClick}>
          <EditIcon style={{ color: blue[500] }} />
        </IconButton>
      }
    />
  </>
  );
}

const columns = [
  { field: 'id', headerName: 'ID', flex: 0.3, minWidth: 90 },
  { field: 'nome', headerName: 'Nome completo', flex: 1.5, minWidth: 150, renderCell: (params) => (
    <Link href={`lojistas/${params.row.id}`}>{params.value}</Link>
  ) },
  { field: 'email', headerName: 'Email', flex: 1, minWidth: 150 },
  { field: 'numero', headerName: 'Telefone', flex: 1, minWidth: 150 },
  { field: 'descricao', headerName: 'Endereço', description: 'This column has a value getter and is not sortable.', flex: 1, minWidth: 150 },
  {
    field: "actions",
    headerName: "Ações",
    sortable: false,
    width: 140,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
          <MatEdit id={params.row.id} />
        </div>

      );
    }
  }
];

export default function Lojistas() {
  const router = useRouter()

  const [lojista, setLojista] = useState([]);
  const { data: session } = useSession()

  useEffect(() => {
    console.log(APIURL)
    fetch(`${APIURL}/api/lojistas`)
      .then(resp => resp.json())
      .then(json => { setLojista(json) })
  }, [])

  if (session) {
    if (session.user.usuario.tipoUsuario === 'admin') {
      return (
        <div style={{ height: 400, width: '100%' }}>
          <AppAppBar></AppAppBar>
          <Button onClick={() => router.back()} variant="contained">Voltar</Button>
          <DataGrid
            rows={lojista}
            columns={columns}
            pageSize={5}
          />
        </div>
      );
    } else {
      return (
        <Forbidden />
      )
    }
  } else {
    return (
      <Forbidden />
    )
  }
}

Lojistas.auth = true

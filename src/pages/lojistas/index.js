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

import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';


const MatEdit = ({ index }) => {

  const handleEditClick = () => {
    // some action
  }


  return <FormControlLabel
    control={
      <IconButton color="secondary" aria-label="add an alarm" onClick={handleEditClick} >
        <EditIcon style={{ color: blue[500] }} />
      </IconButton>
    }
  />
};


const columns = [
  { field: 'id', headerName: 'ID', flex: 0.3, minWidth: 90, },
  { field: 'nome', headerName: 'Nome completo', flex: 1.5, minWidth: 150  ,renderCell: (params) => (
    <Link href={`lojistas/${params.row.id}`}>{params.value}</Link>
  )},
  { field: 'email', headerName: 'Email', flex: 1, minWidth: 150 },
  { field: 'numero', headerName: 'Telefone', flex: 1, minWidth: 150 },
  { field: 'descricao', headerName: 'Endereço', description: 'This column has a value getter and is not sortable.', flex: 1, minWidth: 150 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 140,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
          <MatEdit index={params.row.id} />
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
    fetch("http://localhost:3000/api/lojistas")
      .then(resp => resp.json())
      .then(json => { setLojista(json) })
  }, [])

  if (session) {
    if (session.user.usuario.tipoUsuario === 'admin') {
      return (

        <div style={{ height: 400, width: '100%' }}>
          <AppAppBar></AppAppBar>

          <Button onClick={()=> router.back()} variant="contained">Voltar</Button>

          
          <DataGrid
            rows={lojista}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            
          />
        </div>
      );

    } else {
      return (
        <>
          <Forbidden />
        </>
      )
    }
  } else {
    return (
      <>
        <Forbidden />
      </>
    )
  }

}

Lojistas.auth = true

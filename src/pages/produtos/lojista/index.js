import AppAppBar from '@/components/appAppBar'
import AppFooter from '@/components/appFooter'
import * as React from 'react';
import { FormControlLabel, Button, IconButton, Link } from '@mui/material';
import Forbidden from '@/components/Forbidden';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', flex: 0.3, minWidth: 90, },
    { field: 'nome', headerName: 'Nome ', flex: 1, minWidth: 150  ,renderCell: (params) => (
        <Link href={`/produto/${params.row.id}`}>{params.value}</Link>
      )},
    { field: 'descricao', headerName: 'Descrição', flex: 1, minWidth: 150 },
    { field: 'preco', headerName: 'Preço', flex: 1, minWidth: 150 },
    { field: 'categoria', headerName: 'Categoria', flex: 1, minWidth: 150 },
    { field: 'estoque', headerName: 'Estoque', flex: 1, minWidth: 150 },
    { field: 'file', headerName: 'File', flex: 0.5, minWidth: 130 }
];

export default function Produtos() {
    const router = useRouter()

    const [products, setProducts] = useState([]);
    const { data: session } = useSession()

    const id  = 1

    console.log(id)
  
    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/produto/lojista/?id=` + id , {
        method: 'GET',
      })
        .then(resp => resp.json())
        .then(json => {
          setProducts(json)
        })
    }, [])

    console.log(session) 
    if (session) {
        if (session.user.lojista != null) {
            return (
                <div style={{ height: 400, width: '100%' }}>
                    <AppAppBar></AppAppBar>
                    <Button onClick={()=> router.back()} variant="contained">Voltar</Button>

                    <DataGrid
                        rows={products}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </div>
                /* <AppFooter></AppFooter> */
            );
        } else {
            return (
                <>
                    <Forbidden />
                </>
            )
        }
    } 
}
Produtos.auth = true
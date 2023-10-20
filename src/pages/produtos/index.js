import AppAppBar from '@/components/appAppBar'
import AppFooter from '@/components/appFooter'
import * as React from 'react';
import { FormControlLabel, Button, IconButton } from '@mui/material';
import Forbidden from '@/components/Forbidden';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid';
import { APIURL } from '@/lib/constants';
import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';

const columns = [
    { field: 'id', headerName: 'ID', flex: 0.3, minWidth: 90, },
    { field: 'idLojista', headerName: 'Lojista', flex: 1.5, minWidth: 150 },
    { field: 'nome', headerName: 'Nome', flex: 1, minWidth: 150 },
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

    useEffect(() => {
        fetch(`${APIURL}/api/produto/listar/`, { method: 'GET' })
            .then(resp => resp.json())
            .then(json => { setProducts(json) })
    }, [])
    if (session) {
        if (session.user.usuario.tipoUsuario == "admin") {
            return (
                <div>
                    <AppAppBar />
                    <AppSidebar />
                    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                        <AppHeader />
                        <div style={{ height: 400, width: '100%' }}>
                            <Button onClick={() => router.back()} variant="contained">Voltar</Button>

                            <DataGrid
                                rows={products}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                            />
                        </div>
                    </div>
                </div>
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
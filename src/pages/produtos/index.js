import AppAppBar from '@/components/appAppBar'
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
import Loading from '@/components/Loading';
import Footer from '@/components/appFooter'

function formatarPreco(preco) {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
  }

const columns = [
    { field: 'id', headerName: 'ID', flex: 0.3, minWidth: 90, },
    { field: 'idLojista', headerName: 'ID_Lojista', flex: 1.5, minWidth: 150 },
    { field: 'nome', headerName: 'Nome', flex: 1, minWidth: 150 },
    { field: 'descricao', headerName: 'Descrição', flex: 1, minWidth: 150 },
    { field: 'preco', headerName: 'Preço', flex: 1, minWidth: 150,valueFormatter: (params) => formatarPreco(params.value)},
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

                        {products !== null && products.length > 0 ? (
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
                        ) : (
                            <p><Loading /></p>
                        )}
                    </div>
                    <Footer/>
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
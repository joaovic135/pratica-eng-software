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
    { field: 'idComprador', headerName: 'Comprador', flex: 1.5, minWidth: 150 },
    { field: 'idLojista', headerName: 'Lojista', flex: 1.5, minWidth: 150 },
    { field: 'avaliacao', headerName: 'avaliacao', flex: 1, minWidth: 150 },
    { field: 'analise', headerName: 'analise', flex: 1, minWidth: 150 }
];

export default function Avalicoes() {
    const router = useRouter()

    const [avaliacoes, setAvaliacoes] = useState([]);
    const { data: session } = useSession()

    useEffect(() => {
        fetch(`${APIURL}/api/avaliacao/`, { method: 'GET' })
            .then(resp => resp.json())
            .then(json => { setAvaliacoes(json) })
    }, [])
    if (1) {
        if (1) {
            return (
                <div>
                    
                    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                        
                        <div style={{ height: 400, width: '100%' }}>
                            <Button onClick={() => router.back()} variant="contained">Voltar</Button>

                            <DataGrid
                                rows={avaliacoes}
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
        } /*else {
            return (
                <>
                    <Forbidden />
                </>
            )
        }*/
    } /*else {
        return (
            <>
                <Forbidden />
            </>
        )
    }*/
}
Avalicoes.auth = true
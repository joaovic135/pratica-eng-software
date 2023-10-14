import AppAppBar from "@/components/appAppBar";
import AppFooter from "@/components/appFooter";
import { Box, Button, Grid, Paper } from "@mui/material";
import AppSidebar from "@/components/AppSidebar";
import { useState } from "react";

function Perfil() {
    const [content, setContent] = useState(null)

    const handleButtonClick = (button) => {
        if (button === 'Seguindo lojistas') {
            setContent(<h1>Seguindo lojistas</h1>)
        } else if (button === 'Lista de Avaliações') {
            setContent(<h1>Lista de Avaliações</h1>)
        } else if (button === 'Histórico de Compras') {
            setContent(<h1>Histórico de Compras</h1>)
        }
    }

    return (
        <>
            <AppAppBar></AppAppBar>
            <Grid container>
                <Grid item xs={2} lg={3}>
                    <AppSidebar></AppSidebar>
                </Grid>
                <Grid item sx={10}>
                    <Box
                        sx={{
                            flexDirection: "column",
                            minHeight: "100vh",
                            bgcolor: "background.paper",
                            '& > :not(style)': {
                                m: 1,
                                width: '128',
                                height: '128',
                            },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={5} lg={6}>
                                <Button variant="contained" color="primary" 
                                    onClick={() => handleButtonClick('Seguindo lojistas')}
                                >
                                    Sequindo lojistas
                                </Button>
                            </Grid>
                            <Grid item xs={5} lg={6}>
                                <Button variant="contained" color="primary" 
                                    onClick={() => handleButtonClick('Lista de Avaliações')}
                                >
                                    Lista de Avaliações
                                </Button>
                            </Grid>
                            <Grid item xs={5} lg={6}>
                                <Button variant="contained" color="primary"
                                    onClick={() => handleButtonClick('Histórico de Compras')}
                                >
                                    Histórico de Compras
                                </Button>
                            </Grid>
                            <Paper elevation={0} sx={{ flex: 1 }} />
                            <Paper/>
                            <Paper elevation={3}/>
                        </Grid>
                    </Box>
                </Grid>

            </Grid>
            <AppFooter></AppFooter>
        </>
    );
}

export default Perfil;

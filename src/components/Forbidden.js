import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


export default function Forbidden() {
  const router = useRouter()


  return (
    <>
      <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography variant="h2" sx={{
          marginBottom: '20px'
        }}>
          Acesso Proibido
        </Typography>
        <Typography variant="h5" align="center">
          Você não tem permissão para acessar esta página.
        </Typography>
        <Button
          onClick={() => router.push('/')}
          variant="contained"
          color="primary"
          sx={{
            marginTop: '20px'
          }}
        >
          Voltar para a Página Inicial
        </Button>
      </Box>
    </>
  )
}
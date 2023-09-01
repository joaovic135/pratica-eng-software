import Forbidden from "@/components/Forbidden"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"

export default function AdminSignUp() {

  const router = useRouter()
  const { data: session } = useSession()
  const [nome, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [senha, setSenha] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/admin", {
      credentials: 'include',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, tipoUsuario: 'admin' })
    })
    const data = await response.json()
    const { error } = data
    if (response.status === 401) return setError(error)
    router.push('/admin')
  }

  if (session) {
    if (session.user.usuario.tipoUsuario === 'admin') {
      return (
        <>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Cadastro de Admin
            </Typography>
            <TextField
              name="nome"
              label="Nome"
              variant="outlined"
              value={nome}
              autoFocus
              fullWidth
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              value={email}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              required
              fullWidth
              id="senha"
              label="Senha"
              name="senha"
              autoComplete="senha"
              type='password'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
          </Box>
        </>
      )
    }else{
      return (
        <>
          <Forbidden/>
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
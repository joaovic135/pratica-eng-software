import AppHeader from "@/components/AppHeader"
import AppSidebar from "@/components/AppSidebar"
import Forbidden from "@/components/Forbidden"
import { APIURL } from "@/lib/constants"
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormInput, CFormLabel, CFormTextarea, CRow } from "@coreui/react"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"

export default function AdminSignUp() {

  const router = useRouter()
  const { data: session } = useSession()
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [error, setError] = useState(null);

  const isEmailValid = (email) => {
    // Expressão regular para validar o formato de um email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isPasswordSecure = (password) => {
    // Pelo menos 8 caracteres
    if (password.length < 8) {
      return false;
    }

    // Pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Pelo menos uma letra minúscula
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // Pelo menos um número
    if (!/[0-9]/.test(password)) {
      return false;
    }

    // Pelo menos um caractere especial (por exemplo, !@#$%^&*)
    if (!/[!@#$%^&*]/.test(password)) {
      return false;
    }

    return true;
  };

  const formatPhoneNumber = (value) => {
    // Remove todos os caracteres não numéricos
    const phoneNumber = value.replace(/\D/g, '');

    // Formata o número de telefone no formato brasileiro
    const formattedPhoneNumber = phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return formattedPhoneNumber;
  };

  const isCepValid = (cep) => {
    // Expressão regular para validar o formato de um CEP brasileiro
    const cepRegex = /^\d{8}$/;
    return cepRegex.test(cep);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar os campos
    if (nome.trim() === '') {
      setError('O campo Nome é obrigatório.');
      return;
    }

    if (email.trim() === '') {
      setError('O campo Email é obrigatório.');
      return;
    }

    if (!isEmailValid(email)) {
      setError('Digite um email válido.');
      return;
    }

    if (senha.trim() === '') {
      setError('O campo Senha é obrigatório.');
      return;
    }

    if (!isPasswordSecure(senha)) {
      setError('A senha deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais.');
      return;
    }

    if (telefone.trim() === '') {
      setError('O campo Telefone é obrigatório.');
      return;
    }

    if (endereco.trim() === '') {
      setError('O campo Endereço é obrigatório.');
      return;
    }

    if (cidade.trim() === '') {
      setError('O campo Cidade é obrigatório.');
      return;
    }

    if (cep.trim() === '') {
      setError('O campo CEP é obrigatório.');
      return;
    }

    if (!isCepValid(cep)) {
      setError('Digite um CEP válido (8 dígitos).');
      return;
    }

    const response = await fetch(`${APIURL}/api/admin`, {
      credentials: 'include',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, telefone, endereco, cidade, cep, tipoUsuario: 'admin' })
    })
    const data = await response.json()
    const { error } = data
    if (response.status === 400) return setError("Email ja cadastrado")
    router.push('/auth/admin')
  }

  if (session) {
    if (session.user.usuario.tipoUsuario === 'admin') {
      return (
        <>
          <AppSidebar />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader />
            <CContainer lg>
              <CRow>
                <CCol xs={12}>
                  <CCard className="mb-4">
                    <CCardHeader>
                      <strong>Cadastro de Admin</strong>
                    </CCardHeader>

                    <CCardBody>
                      <div className="mb-3">
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                          <TextField
                            name="nome"
                            label="Nome"
                            variant="outlined"
                            value={nome}
                            autoFocus
                            fullWidth
                            onChange={(e) => setNome(e.target.value)}
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
                            sx={{ marginBottom: 2 }}
                          />
                          <TextField
                            name="telefone"
                            label="Telefone"
                            variant="outlined"
                            value={telefone}
                            fullWidth
                            onChange={(e) => setTelefone(formatPhoneNumber(e.target.value))}
                            sx={{ marginBottom: 2 }}
                          />
                          <TextField
                            name="endereco"
                            label="Endereço"
                            variant="outlined"
                            value={endereco}
                            fullWidth
                            onChange={(e) => setEndereco(e.target.value)}
                            sx={{ marginBottom: 2 }}
                          />
                          <TextField
                            name="cidade"
                            label="Cidade"
                            variant="outlined"
                            value={cidade}
                            fullWidth
                            onChange={(e) => setCidade(e.target.value)}
                            sx={{ marginBottom: 2 }}
                          />
                          <TextField
                            name="cep"
                            label="CEP"
                            variant="outlined"
                            value={cep}
                            fullWidth
                            onChange={(e) => setCep(e.target.value)}
                            sx={{ marginBottom: 2 }}
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
                        {error && (
                          <Typography variant="body2" color="error">
                            {error}
                          </Typography>
                        )}
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CContainer>
          </div>

        </>
      )
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

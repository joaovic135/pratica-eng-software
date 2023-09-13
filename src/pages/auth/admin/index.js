import Forbidden from "@/components/Forbidden"
import ButtonAdminCadastro from "@/components/ButtonAdminCadastro"
import { AppBar, Box, Button, Container, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import ButtonListarCompradores from "@/components/ButtonListarCompradores"
import AppAppBar from '@/components/appAppBar'

export default function AdminDashboard() {
  const router = useRouter()
  const { data: session } = useSession()
  console.log(session)



  if (session) {
    if(session.user.usuario.tipoUsuario === 'admin'){
      return (
        <>
          <AppAppBar></AppAppBar>
          <ButtonAdminCadastro />
          <ButtonListarCompradores />
        </>
      )
    }else {
      return (
        <>
          <Forbidden />
        </>
      )
    }
  }else {
    return (
      <>
        <Forbidden />
      </>
    )
  }
}

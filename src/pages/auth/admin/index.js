import Forbidden from "@/components/Forbidden"
import ButtonAdminCadastro from "@/components/ButtonAdminCadastro"
import { AppBar, Box, Button, Container, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import ButtonListarCompradores from "@/components/ButtonListarCompradores"
import AppAppBar from '@/components/appAppBar'
import ButtonListarLojistas from "@/components/ButtonListarLojistas"
import ButtonListarProdutos from "@/components/ButtonListarProdutos"
import AppSidebar from "@/components/AppSidebar"
import AppHeader from "@/components/AppHeader"

export default function AdminDashboard() {
  const router = useRouter()
  const { data: session } = useSession()



  if (session) {
    if (session.user.usuario.tipoUsuario === 'admin') {
      return (
        <>

          <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <ButtonAdminCadastro />
                <ButtonListarCompradores />
                <ButtonListarLojistas />
                <ButtonListarProdutos />
              </div>
              {/* O FOOTER */}
            </div>

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

AdminDashboard.auth = true
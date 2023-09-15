import Forbidden from "@/components/Forbidden"
import ButtonAdminCadastro from "@/components/ButtonAdminCadastro"
import { AppBar, Box, Button, Container, Link, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import ButtonListarCompradores from "@/components/ButtonListarCompradores"
import AppAppBar from '@/components/appAppBar'

export default function LojistaDashboard() {
  const router = useRouter()
  //const { data: session } = useSession()
  //console.log(session)



  //if (session) {

    return (
      <>
        <AppAppBar></AppAppBar>
        <h1>Painel do Lojista</h1>
        <Link href="/"> {/* Este é o link para a página de lista de produtos */}
          <Button variant="contained" color="primary">
            Listar Produtos
          </Button>
        </Link>
      </>
    )

  /*} else {
    return (
      <>
        <Forbidden />
      </>
    )
  }*/
}

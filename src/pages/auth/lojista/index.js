import Forbidden from "@/components/Forbidden"
import ButtonAdminCadastro from "@/components/ButtonAdminCadastro"
import { AppBar, Box, Button, Container, Link, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import ButtonListarCompradores from "@/components/ButtonListarCompradores"
import AppAppBar from '@/components/appAppBar'
import { useState } from "react"
import { useEffect } from "react"
import AppSidebar from "@/components/appSidebar_Lojista"
import AppFooter from '@/components/appFooter'
import AppHeader from "@/components/AppHeader2"

export default function LojistaDashboard() {
  const router = useRouter()
  const [sessao, setSession] = useState(null)
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/auth/lojista/login')
    },
  })

  useEffect(() => {
    if (session){
      setSession(session.user.lojista)
    } 
  },[session])

  console.log(sessao)
  return (
    <>
      
      {/*{sessao && <AppAppBar sessao={sessao} />}*/}
      <AppAppBar/>
      
      
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          {/*<div className="body flex-grow-1 px-3">
            <ButtonAdminCadastro />
            <ButtonListarCompradores />
            <ButtonListarLojistas />
            <ButtonListarProdutos />
          </div>
        {O FOOTER }*/}
        </div>
      </div>

      
      <h1>Painel do Lojista</h1>
      <Link href="/produtos/lojista"> {/* Este é o link para a página de lista de produtos */}
        <Button variant="contained" color="primary">
          Listar Produtos
        </Button>
      </Link>
      <Link href="/produto/cadastrar"> {/* Este é o link para a página de lista de produtos */}
        <Button variant="contained" color="primary">
          Cadastrar Produto
        </Button>
      </Link>
      <Box></Box>
      <AppFooter/>
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

LojistaDashboard.auth = true
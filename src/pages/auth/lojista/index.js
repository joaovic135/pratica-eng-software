import Forbidden from "@/components/Forbidden"
import { AppBar, Box, Button, Container, Link, Typography } from "@mui/material"
import * as React from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import ButtonLojistaCadastrarProduto from "@/components/ButtonLojistaCadastrarProduto"
import ButtonLojistaListarProdutos from "@/components/ButtonLojistaListarProdutos"
import AppAppBar from '@/components/appAppBar'
import { useState } from "react"
import { useEffect } from "react"
import AppSidebar from "@/components/appSidebar_Lojista"
import AppFooter from '@/components/appFooter'
import AppHeader from "@/components/AppHeader_Lojista"

export default function LojistaDashboard() {
  const router = useRouter()
  const [sessao, setSession] = useState(null)
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

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
      {sessao && <AppAppBar sessao={sessao} />}
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <ButtonLojistaListarProdutos/> {/* Este é o link para a página de lista de produtos */}
            <ButtonLojistaCadastrarProduto/> {/* Este é o link para a página de cadastro de produtos */}
          </div>  
        </div>
      </div>
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
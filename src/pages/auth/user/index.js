import Forbidden from "@/components/Forbidden"
import { AppBar, Box, Button, Container, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import AppAppBar from '@/components/appAppBar'
import ButtonUsuarioEditarPerfil from "@/components/ButtonUsuarioEditarPerfil"
import ButtonUsuarioAlterarSenha from "@/components/ButtonUsuarioAlterarSenha"
import AppSidebar from "@/components/AppSideBarComprador"
import AppHeader from "@/components/AppHeader"
import AppFooter from "@/components/appFooter"
import ButtonLojistaEditarPerfil from "@/components/ButtonLojistaEditarPerfil"

export default function UserDashboard() {
    const router = useRouter()
    const [sessao, setSession] = useState(null)

    const { data: session } = useSession({
      required: true,
      onUnauthenticated() {
        return router.push('/auth/login')
      },
    })
  
    useEffect(() => {
      if (session){
        setSession(session.user.usuario)
      } 
    },[session])
  
    //console.log(sessao)
    const userId = session.user.usuario.id;


      return (
        <>
      {sessao && <AppAppBar sessao={sessao} />}
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <div className="mb-3"> {/* Container for Editar Perfil button */}
              <ButtonUsuarioAlterarSenha/> {/* Este é o link para a página de cadastro de produtos */}
              <ButtonUsuarioEditarPerfil id={userId} />
            </div>
          </div>  
        </div>
      </div>
      <AppFooter/>
    </>
      );
}

UserDashboard.auth = true
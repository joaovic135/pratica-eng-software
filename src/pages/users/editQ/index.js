import Forbidden from "@/components/Forbidden"
import { AppBar, Box, Button, Container, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import AppAppBar from '@/components/appAppBar'
import AppSidebar from "@/components/AppSideBarComprador"
import AppHeader from "@/components/AppHeader"
import AppFooter from "@/components/appFooter"

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

    router.push(`/users/edit/${userId}`)

}

UserDashboard.auth = true

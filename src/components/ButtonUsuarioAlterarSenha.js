import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ButtonUsuarioAlterarSenha({}){
  const router = useRouter()
  const {data:session} = useSession()

  if(1){
    return(
      <>
        <Button onClick={()=> router.push(`/users/alterarSenha`)} variant="contained">Alterar Senha</Button>
      </>
    )
  }
}
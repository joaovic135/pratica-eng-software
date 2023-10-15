import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ButtonLojistaCadastrarProduto(){
  const router = useRouter()
  const {data:session} = useSession()

  if(1){
    return(
      <>
        <Button onClick={()=> router.push('/produto/cadastrar')} variant="contained">Cadastrar Produto</Button>
      </>
    )
  }
}
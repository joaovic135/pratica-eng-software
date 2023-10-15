import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ButtonLojistaListarProdutos(){
  const router = useRouter()
  const {data:session} = useSession()

  if(1){
    return(
      <>
        <Button onClick={()=> router.push('/produtos/lojista')} variant="contained">Listar Produtos</Button>
      </>
    )
  }
}
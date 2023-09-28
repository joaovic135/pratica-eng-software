import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


export default function ButtonListarLojistas(){
  const router = useRouter()
  const {data:session} = useSession()



  if(1){
    return(
      <>
        <Button onClick={()=> router.push('/lojistas/')} variant="contained">Listar lojistas</Button>
      </>
    )
  }
}
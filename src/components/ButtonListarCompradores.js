import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


export default function ButtonListarCompradores(){
  const router = useRouter()
  const {data:session} = useSession()



  if(1){
    return(
      <>
        <Button onClick={()=> router.push('/users/')} variant="contained">Listar usuarios</Button>
      </>
    )
  }
}
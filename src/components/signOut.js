import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@mui/material"
import {persistor} from "@/redux/store"

export default function SignOut(){
  const { data:session } = useSession()

  const handleLogout = () => {
    persistor.purge(); // Isso apagará os dados persistidos
    // Outras ações de logout
    signOut()
  };

  if (session) {
    
    return ( 
      <Button 
        onClick={() => handleLogout()}
        variant="contained"
      >
        Sign Out
      </Button> 
    )

  }else{
    return (
      <>
        <Button 
          onClick={() => signIn()}
          variant="contained"
        >
          Sign in
        </Button>
      </>
    )
  }

}
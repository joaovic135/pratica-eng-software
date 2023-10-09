import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@mui/material"

export default function SignOut(){
  const { data:session } = useSession()
  if (session) {
    return ( 
      <Button 
        onClick={() => signOut()}
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
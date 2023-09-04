import { signOut } from "next-auth/react"
import { Button } from "@mui/material"

export default function SignOut(){
  return ( 
    <Button 
      onClick={() => signOut()}
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Sign Out
    </Button> 
  )
}
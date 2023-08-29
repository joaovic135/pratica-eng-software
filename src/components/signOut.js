import { Button } from "@mui/material"
import { signOut } from "next-auth/react"
export default function SignOut(){
  return <Button onClick={() => signOut()}>Logout</Button>
}
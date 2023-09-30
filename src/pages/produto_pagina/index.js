import { useSession, signIn, signOut } from "next-auth/react"
import AppFooter from '@/components/appFooter'
import AppAppBar from '@/components/appAppBar'
import Button from '@/components/button'
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function About() {
  const { data:session } = useSession()
  if (session) {
    return (
      <>
        Signed in as  <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      <AppAppBar></AppAppBar>



      <Button variant="outlined" startIcon={<ShoppingCartRounded />}>
        Adicionar ao carrinho
      </Button>


      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Descrição"
            multiline
            rows={4}
          />
        </div>
      </Box>

      <AppFooter></AppFooter>
    </>
  )
}
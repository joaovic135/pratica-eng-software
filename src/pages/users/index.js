import Forbidden from '@/components/Forbidden';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { useState } from "react";


export default function Users() {
  const router = useRouter()

  const [users, setUsers] = useState([]);
  const { data: session } = useSession()



  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then(resp => resp.json())
      .then(json => { setUsers(json) })
  }, [])

  if (session) {
    if(session.user.usuario.tipoUsuario === 'admin'){
      return (

        <>
          <h1>Lista de usuarios</h1>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <h2>{user.nome}</h2>
                <p>{user.email}</p>
              </li>
            ))}
          </ul>
        </>
    
      )
    }else {
      return (
        <>
          <Forbidden />
        </>
      )
    }
  }else{
    return (
      <>
        <Forbidden />
      </>
    )
  }
  
}



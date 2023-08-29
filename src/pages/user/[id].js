import { useRouter } from 'next/router'
import { useEffect } from "react";
import { useState } from "react";


export default function User() {
  const router = useRouter()

  const [name, setName] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/usuario")
      .then(resp => resp.json())
      .then(json => { setName(json) })
  }, [])

  return (

    <>
      <p>{name.name}</p>
      <p>Usuario: {router.query.id}</p>
    </>

  )
}



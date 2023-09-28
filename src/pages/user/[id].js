import { APIURL } from '@/lib/constants';
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { useState } from "react";


export default function User() {
  const router = useRouter()

  const [name, setName] = useState([]);

  useEffect(() => {
    fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/usuario`)
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

User.auth = true

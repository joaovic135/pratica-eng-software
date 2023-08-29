import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { useState } from "react";

export default function Produto() {
  const router = useRouter()
  const [name, setName] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api/produto")
      const { name } = await response.json()
      setName(name)
    }
    fetchData()
  }, [])



  return (

    <>
      <p>{name}</p>
      <p>Produto: {router.query.id}</p>
      
      <Link href="/">Link Para Home</Link> <br />
      <button onClick={() => router.push('/')}>
        Link Alternativo para Home
      </button>

    </>

  )
}



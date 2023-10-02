import Link from 'next/link'

const NotFound = () => {
    return(
        <div>
        <h1>Produto não encontrado</h1>
            <p>
                <Link href="/">
                    Página Inicial
                </Link>
            </p>
        </div>
    )
}

export default NotFound;
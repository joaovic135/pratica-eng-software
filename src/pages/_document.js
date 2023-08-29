import Layout from '@/components/layout'
import { SessionProvider } from 'next-auth/react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  
  return (
    <Html lang="en">
      <Head />
      <body>
        <SessionProvider>
          <Layout>
            <Main />
            <NextScript />
          </Layout>
        </SessionProvider>
      </body>
    </Html>
  )
}

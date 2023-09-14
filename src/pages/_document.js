import Layout from '@/components/layout'
import { SessionProvider } from 'next-auth/react'
import { Html, Head, Main, NextScript } from 'next/document'
import AppAppBar from '@/components/appAppBar'

export default function Document() {

  return (
    <Html lang="en">
      <Head />
      <body>
        <Layout>
          <Main />
          <NextScript />
        </Layout>
      </body>
    </Html>
  )
}

import { SessionProvider, useSession } from "next-auth/react"
import 'node_modules/@coreui/coreui/dist/css/coreui.min.css';
import store from '../redux/store';
import { Provider } from 'react-redux';
import '../scss/style.scss'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} >
      <Provider store={store}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
    </SessionProvider >
  )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}
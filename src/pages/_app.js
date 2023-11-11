import { SessionProvider, useSession } from "next-auth/react"
import 'node_modules/@coreui/coreui/dist/css/coreui.min.css';
import {store, peristor, persistor} from '../redux/store';
import { Provider } from 'react-redux';
import '../scss/style.scss'
import Loading from "@/components/Loading";
import { PersistGate } from 'redux-persist/integration/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </PersistGate>
      </Provider>
    </SessionProvider >
  )
}

function Auth({ children }) {
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div><Loading/></div>
  }

  return children
}
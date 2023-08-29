import Footer from './footer'


export default function Layout({ children }) {

  
  return (
    <>
      <main style={{height: "90vh"}}>{children}</main>
      <Footer />
    </>
  )

}
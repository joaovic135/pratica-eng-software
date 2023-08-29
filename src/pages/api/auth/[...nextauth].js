import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials:{
        email: { label: "Email", type: "text", placeholder: "email" },
        senha: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {

        
        const res = await fetch("http://localhost:3000/api/login", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            senha: credentials?.senha
          }),
        });

        const user = await res.json();
        console.log(user)
        if (user) {
          return user
        }else{
          return null;
        }
      }
    })
    // ...add more providers here
  ],

  pages:{
    signIn: '/auth/login',
  }
  // A database is optional, but required to persist accounts in a database
})
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtConfig } from './jwt-config.js';
import db from '../../../models/index';
db.sequelize.sync();
const Usuario = db.Usuario;


export default NextAuth({
  // Configure one or more authentication providers
  secret : jwtConfig.signingKey,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',

      credentials:{
        email: { label: "Email",type: 'text', placeholder: "email" },
        password: { label: "Password",type: 'text' },      },

      async authorize(credentials, req) {
        
        const res = await fetch("http://localhost:3000/api/login", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            senha: credentials.password
          }),
        });
        
        const user = await res.json();
        console.log(user)
        if (res.ok && user) {
          return user
        }
        return null

      }
    }),
    CredentialsProvider({
      id: 'admin',
      name: 'Admin',
      async authorize(credentials, req) {
        try{
          const res = await fetch("http://localhost:3000/api/admin/login", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              senha: credentials.password
            }),
          });
          
          const user = await res.json();
          console.log(user)
          console.log("linha56")
          if (res.ok && user) {
            return user
          }else{
            throw new Error(user.error)
          }

        }catch(e){
          console.log(e.message)
          const errorMessage = e.message
          throw new Error(errorMessage)
        }
        
        
      }
    }),
    CredentialsProvider({
      id: 'lojista',
      name: 'Lojista',
      async authorize(credentials, req) {
        try{
          const res = await fetch("http://localhost:3000/api/lojista/login", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              senha: credentials.password
            }),
          });
          
          const user = await res.json();
          console.log(user)
          console.log("linha56")
          if (res.ok && user) {
            return user
          }else{
            throw new Error(user.error)
          }

        }catch(e){
          console.log(e.message)
          const errorMessage = e.message
          throw new Error(errorMessage)
        }
        
        
      }
    })
    // ...add more providers here
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    signingKey: jwtConfig.signingKey,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    

    
  },
  pages:{
    signIn: '/auth/login',
  },

  // A database is optional, but required to persist accounts in a database
})
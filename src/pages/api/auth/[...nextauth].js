import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtConfig } from './jwt-config.js';
import { APIURL } from "@/lib/constants.js";
import axios from "axios";

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
        
        const res = await fetch(`${APIURL}/api/login`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            senha: credentials.password
          }),
        });
        
        const user = await res.json();
        if (res.ok && user) {
          return user
        }
        throw new Error('Usuário não encontrado. Verifique o email e tente novamente.');

      }
    }),
    CredentialsProvider({
      id: 'admin',
      name: 'Admin',
      async authorize(credentials, req) {
        try{
          const res = await fetch(`${APIURL}/api/admin/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              senha: credentials.password
            }),
          });
          
          const user = await res.json();
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
        try {
          const response = await axios({
            method: 'POST',
            url: `${APIURL}/api/lojista/login`,
            data: {
              email: credentials.email,
              senha: credentials.password,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
        
          if (response.status === 200 && response.data) {
            return response.data;
          } else {
            throw new Error(response.data.error);
          }
        } catch (error) {
          console.error(error.message);
          throw new Error(error.message);
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
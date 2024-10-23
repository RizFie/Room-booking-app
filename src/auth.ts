import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./lib/zod"
import { compareSync } from "bcrypt-ts"
import { NextResponse } from "next/server"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  pages: {signIn: "/login"},
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}, 
      },
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);

        if(!validatedFields.success){
          return null;
        }

        const {email, password} = validatedFields.data;

        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        });

        if(!user){
          throw new Error("No user found");
        }

        const passwordMatch = compareSync(password, user.password);

        if(!passwordMatch) return null;
        return user;
      }
    })
  ],
  //callback
  callbacks:{
    authorized({auth,request: {nextUrl}}){
      const isLoggedIn = !!auth?.user;
      //add more routes here
      const ProtectedRoutes = ["/main/home",];

      if(!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)){
        return NextResponse.redirect(new URL("/login",nextUrl));
      }

      if(isLoggedIn && nextUrl.pathname.startsWith("/login")){
        return NextResponse.redirect(new URL("/main/home",nextUrl));
      }

      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.picture = user.avatar;
        token.name = user.fullname;
        token.role = user.role;
      }
      return token;
    },

    session({ session, token }) {
      session.user.image = token.picture;
      session.user.id = token.sub;
      session.user.name = token.name;
      session.user.role = token.role;
      return session;
    }
  }
})
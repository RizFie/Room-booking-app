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
        console.log("user info",user);
        return user;
      }
    })
  ],
  //callback
  callbacks:{
    authorized({auth,request: {nextUrl}}){

      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user.role;

      //add more routes here
      const ProtectedRoutes = ["/main/home","/main/reserve","/main/cancel","/main","/","/main/profile","/admin"];
      const adminProtectedRoutes = ["/main","/admin","/","/admin/dashboard"];

      if(!isLoggedIn && (ProtectedRoutes.includes(nextUrl.pathname) || adminProtectedRoutes.includes(nextUrl.pathname))){
        return NextResponse.redirect(new URL("/login",nextUrl));
      }

      if(isLoggedIn){
        if(userRole === "admin" && (nextUrl.pathname.startsWith("/login") || ProtectedRoutes.includes(nextUrl.pathname))){
          return NextResponse.redirect(new URL("/admin/dashboard",nextUrl));
        }
        else if(userRole === "user" && (nextUrl.pathname.startsWith("/login") || adminProtectedRoutes.includes(nextUrl.pathname))){
          return NextResponse.redirect(new URL("/main/home",nextUrl));
        }
      }

      return true;
    },

    jwt({ token, user }) {
      if (user) {
        //console.log("userJWT: ",user)
        token.sub = user.userId || '';
        token.name = user.fullname;
        token.role = user.role;
      }
      return token;
    },

    session({ session, token }) {
      session.user.id = token.sub;
      session.user.name = token.name;
      session.user.role = token.role;
      return session;
    }
  }
})
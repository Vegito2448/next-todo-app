import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "@prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { customSignIn } from "./actions";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google, Credentials({
    name: 'Credentials',
    credentials: {
      email: { type: "email", label: "Email", placeholder: "example@domain.com" },
      password: { type: "password", label: "Password", placeholder: "******" }
    },
    authorize: async (credentials) => {
      let user = await customSignIn(credentials as User);

      if (!user) {
        // No user found, so this is their first attempt to login
        // meaning this is also the place you could do registration
        throw new Error("User not found.");
      }

      // return user object with the their profile data
      return user;
    },
  })],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    /* async signIn({ user, account, profile, email, credentials }) {

      return true; // Return false to display an error message to the user that sign in is not allowed
    }, */
    async jwt({ token, }) {

      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email ?? 'no-email',
        },
      });

      if (!dbUser?.active)
        throw new Error('User is not active');


      Object.assign(token, {
        id: dbUser.id,
        roles: dbUser.roles,
      });

      return token; // Return a JSON object to be saved in the JSON Web Token
    },
    async session({ session, token, }) {

      console.log(`🚀 ~ session ~ session:`, session);


      if (session && session.user) {
        Object.assign(session.user, {
          roles: token.roles,
          id: token.id
        });
      }

      return session;
    }

  }


});
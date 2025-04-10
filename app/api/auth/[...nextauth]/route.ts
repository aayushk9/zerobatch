import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { prismaClient } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      // Store user email if not already present
      const existingUser = await prismaClient.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        await prismaClient.user.create({
          data: { 
            email: user.email,
            provider: "Google"
        },
        });
      }

      return true;
    },
    async session({ session }) {
      // Optional: you can attach the DB user ID here
      const dbUser = await prismaClient.user.findUnique({
        where: { email: session.user?.email},
      });

      if (dbUser && session.user) {
        session.user.id = dbUser.id;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };

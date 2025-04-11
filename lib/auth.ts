import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const existingUser = await prismaClient.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        await prismaClient.user.create({
          data: {
            email: user.email,
            provider: "Google",
          },
        });
      }

      return true;
    },
    async session({ session }) {
      const dbUser = await prismaClient.user.findUnique({
        where: { email: session.user?.email },
      });

      if (dbUser && session.user) {
        session.user.id = dbUser.id;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

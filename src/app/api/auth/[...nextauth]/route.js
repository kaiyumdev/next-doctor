import NextAuth from "next-auth/next";
import credentialsProvider from "next-auth/providers/credentials";
import { async } from "../../../../lib/connectDB";

const handler = async () =>
  NextAuth({
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
    },
    providers: [
      credentialsProvider({
        credentials: {
          email: {},
          password: {},
        },
        async authorize(credentials) {
          return true;
        },
      }),
    ],
    callbacks: {},
    pages: {
      signIn: "/login",
    },
  });

export { handler as GET, handler as POST };

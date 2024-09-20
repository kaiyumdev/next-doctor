import NextAuth from "next-auth/next";
import credentialsProvider from "next-auth/providers/credentials";

const handler = async () =>
  NextAuth({
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
    },
    providers: [credentialsProvider({})],
    callbacks: {},
    pages: {
      signIn: "/login",
    },
  });

export { handler as GET, handler as POST };

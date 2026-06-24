// auth handler
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Dummy",
      credentials: {},
      async authorize() {
        return null; // always fails, but placeholder
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "dummy-secret",
});

export { handler as GET, handler as POST };
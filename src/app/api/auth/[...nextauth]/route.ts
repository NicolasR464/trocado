import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: any = {
  theme: {
    colorScheme: "light",
    brandColor: "#24059d",
    logo: "",
    buttonText: "#ffdf6b",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.SECRET,
  session: { strategy: "jwt" },

  callbacks: {
    session({ session, token }: { token: any; session: any }) {
      session.user.email = token.email;
      session.user.isNewUser = token.isNewUser;
      session.user.role = token.role;
      session.user.address = token.address;
      session.user.userId = token.sub;
      return session;
    },
    jwt({ token, isNewUser }: { token: any; isNewUser: boolean }) {
      // console.log("TOKEN 🔥");
      // console.log(token);

      if (isNewUser === true || isNewUser === false) {
        token.isNewUser = isNewUser;
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

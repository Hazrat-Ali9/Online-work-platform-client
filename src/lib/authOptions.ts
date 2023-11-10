import { jwtHelpers } from "@/helpers/jwthelpers/jwthelpers";
import { getNewAccessToken, login } from "@/services/auth.services";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { removeFromLocalStorage } from "@/utils/local-storage";
import { signOut } from "next-auth/react";
import { AUTH_KEY } from "@/constants/storageKey";

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "my-app-credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const result = await login({
          email: credentials?.email,
          password: credentials?.password,
        });

        const data = result?.data;
        const message = (result as any)?.message;

        const verifiedToken: any = jwtHelpers.verifyToken(
          data?.accessToken,
          process.env.JWT_SECRET!
        );
        // const { data, message } = await res.json();
        if (data) {
          // Any object returned will be saved in `user` property of the JWT
          return { ...data, ...verifiedToken };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error(message);

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_APP_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_APP_CLIENT_SECRET as string,
    // }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log(token, "token auth option")
      // console.log(user, "user auth option")
      return {
        ...token,
        ...user,
      };
    },
    async session({ session, token }: { session: any; token: any }) {
      const verifiedToken = jwtHelpers.verifyToken(
        token?.accessToken,
        process.env.JWT_SECRET!
      );
      if (!verifiedToken) {
        const { data }: Record<string, any> = await getNewAccessToken(
          token?.accessToken
        );
        token.accessToken = data?.accessToken;
      }
      return {
        ...session,
        ...token,
      };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/login",
    error: "/",
  },
};

export const logout = () => {
  signOut();
  removeFromLocalStorage(AUTH_KEY);
};

import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: UpstashRedisAdapter(db),
  providers: [Google],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.get(`user:${token.id}`);

      if (!dbUser) {
        if (user) {
          token.id = user.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
});

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      if (user.id) {
        await db.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() },
        });
      }
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      const customSession = session;

      if (token.sub) {
        customSession.user.id = token.sub;
      }

      if (token.role) {
        customSession.user.role = token.role;
      }

      if (token.isTwoFactorEnabled !== undefined) {
        customSession.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }

      customSession.user.name = token.name || '';
      customSession.user.email = token.email || '';
      customSession.user.isOAuth = token.isOAuth || false;

      return customSession;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      return {
        ...token,
        isOAuth: !!existingAccount,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        isTwoFactorEnabled: existingUser.isTwoFactorEnabled,
      };
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

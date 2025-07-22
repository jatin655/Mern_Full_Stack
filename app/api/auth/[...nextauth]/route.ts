import { logAuditEvent } from '@/lib/audit-log';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  providers: [
    // Only add Google provider if credentials are available
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ] : []),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const client = await clientPromise;
          const db = client.db();
          const users = db.collection('users');

          // Check for hardcoded admin user first
          if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
            return {
              id: 'admin-1',
              name: 'Admin User',
              email: 'admin@example.com',
              role: 'admin'
            };
          }

          // Check for hardcoded test user
          if (credentials.email === 'user@example.com' && credentials.password === 'password') {
            return {
              id: 'user-1',
              name: 'Regular User',
              email: 'user@example.com',
              role: 'user'
            };
          }

          // Check database for registered users
          const user = await users.findOne({ email: credentials.email });
          
          if (!user) {
            return null;
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || 'user'
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, req }: any) {
      // Handle Google sign-in
      if (account?.provider === 'google') {
        try {
          const client = await clientPromise;
          const db = client.db();
          const users = db.collection('users');
          
          // Check if user already exists
          const existingUser = await users.findOne({ email: user.email });
          
          if (!existingUser) {
            // Create new user from Google
            await users.insertOne({
              name: user.name,
              email: user.email,
              role: 'user', // Default role for Google users
              createdAt: new Date(),
              provider: 'google',
              providerId: account.providerAccountId,
            });
          }
          
          return true;
        } catch (error) {
          console.error('Error during Google sign-in:', error);
          return false;
        }
      }
      // Log successful sign-in (for both credentials and Google)
      if (user?.email) {
        await logAuditEvent({
          user: user.email,
          action: 'USER_LOGIN',
          details: `Successful login for ${user.email}`,
          severity: 'low',
          req,
        });
      }
      return true;
    },
    async jwt({ token, user, account }: any) {
      if (user) {
        token.role = (user as any).role || 'user';
        token.name = user.name;
        token.email = user.email;
        token.provider = account?.provider;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        (session.user as any).role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
        (session.user as any).provider = token.provider;
      }
      return session;
    },
  },
  events: {
    async signOut({ token, session, req }: any) {
      // Log sign out event
      const email = token?.email || session?.user?.email;
      if (email) {
        await logAuditEvent({
          user: email,
          action: 'USER_LOGOUT',
          details: `User ${email} logged out`,
          severity: 'low',
          req,
        });
      }
    },
  },
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


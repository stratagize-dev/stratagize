// noinspection JSUnusedGlobalSymbols

import NextAuth, { TokenSet } from 'next-auth';
import StravaProvider from 'next-auth/providers/strava';
import { AuthOptions } from 'next-auth';
import { CustomJWT } from '@/shared/types/auth/CustomJWT';
import CustomSession from '@/shared/types/auth/CustomSession';

const clientId = '78158';
const clientSecret = '518b64884cb8adc8d6ccf9602d2a101d8018a8bd';
export const authOptions: AuthOptions = {
  providers: [
    StravaProvider({
      clientId: process.env.CLIENT_ID ?? '',
      clientSecret: process.env.CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: 'profile:read_all,activity:read_all'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      const customJWT: CustomJWT = {
        ...token
      };
      if (account) {
        customJWT.accessToken = account.access_token;
        customJWT.refreshToken = account.refresh_token;
      }

      if (Date.now() < Number(token.exp) * 1000) {
        try {
          const response = await fetch('https://www.strava.com/oauth/token', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: clientId,
              client_secret: clientSecret,
              grant_type: 'refresh_token',
              refresh_token: customJWT.refreshToken ?? ''
            }),
            method: 'POST'
          });

          const tokens: TokenSet = await response.json();

          if (!response.ok) throw tokens;

          customJWT.accessToken = tokens.access_token;
          customJWT.exp = Math.floor(
            Date.now() / 1000 + (tokens.expires_at ?? 0)
          );
          customJWT.refreshToken = tokens.refresh_token;
        } catch (e) {
          console.error(e);
        }
      }

      return customJWT;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const customSession: CustomSession = {
        ...session,
        athleteId: token.sub,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string
      };
      return customSession;
    }
  },
  events: {
    signIn: message => console.debug('event', 'signIn', { message }),
    signOut: message => console.debug('event', 'signOut', { message }),
    createUser: message => console.debug('event', 'createUser', { message }),
    updateUser: message => console.debug('event', 'updateUser', { message }),
    linkAccount: message => console.debug('event', 'linkAccount', { message }),
    session: message => console.debug('event', 'session', { message })
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

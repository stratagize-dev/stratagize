// noinspection JSUnusedGlobalSymbols

import NextAuth from 'next-auth';
import StravaProvider from 'next-auth/providers/strava';
import { AuthOptions } from 'next-auth';
import { CustomJWT } from '@/shared/types/auth/CustomJWT';
import CustomSession from '@/shared/types/auth/CustomSession';
import { updateAthleteSession } from '@/shared/services/athleteService';
import { refreshToken } from '@/shared/external/Strava/token/refreshToken';

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
          const result = await refreshToken(customJWT.refreshToken ?? '');
          customJWT.accessToken = result.accessToken;
          customJWT.exp = result.expiry;
          customJWT.refreshToken = result.refreshToken;
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
    session: async message => {
      const customSession = message.session as CustomSession;

      if (customSession.athleteId && customSession.refreshToken) {
        const athleteId = parseInt(customSession.athleteId);
        await updateAthleteSession(athleteId, customSession.refreshToken);
      }
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

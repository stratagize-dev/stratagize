import { getServerSession } from 'next-auth';
import { AuthOptions } from 'next-auth';
import CustomSession from '@/shared/types/auth/CustomSession';
import StravaProvider from 'next-auth/providers/strava';
import { CustomJWT } from '@/shared/types/auth/CustomJWT';
import { refreshToken } from '@/shared/external/Strava/token/refreshToken';
import sessionService from '@/shared/services/sessionService';
import jwt from 'jsonwebtoken';
import { Config } from '@/shared/config';
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
      const payload = {
        userId: token.sub,
        exp: token.exp
      };

      const supabaseToken = jwt.sign(payload, Config.supabaseJWTSecret);
      // Send properties to the client, like an access_token and user id from a provider.
      const customSession: CustomSession = {
        ...session,
        athleteId: token.sub,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
        supabaseToken
      };
      return customSession;
    }
  },
  events: {
    signIn: message => {
      console.debug('event', 'signIn', { message });
    },
    signOut: message => console.debug('event', 'signOut', { message }),
    createUser: message => console.debug('event', 'createUser', { message }),
    updateUser: message => console.debug('event', 'updateUser', { message }),
    linkAccount: message => console.debug('event', 'linkAccount', { message }),
    session: async message => {
      // console.debug('event', 'session', { message });
      const customSession = message.session as CustomSession;

      if (customSession.athleteId && customSession) {
        const athleteId = parseInt(customSession.athleteId);
        await sessionService.beginSession(athleteId, customSession);
      }
    }
  }
};

export const getAuthDetails = async () => {
  const session = await getServerSession<AuthOptions, CustomSession>(
    authOptions
  );

  if (session == null) throw new Error('Not Authorised');

  return  {athleteId: Number(session.athleteId), supabaseToken: session.supabaseToken,  session};
};

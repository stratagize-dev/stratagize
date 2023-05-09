// noinspection JSUnusedGlobalSymbols

import NextAuth from 'next-auth';
import StravaProvider from 'next-auth/providers/strava';
import { AuthOptions } from 'next-auth/src';
import { CustomJWT } from '@/shared/types/auth/CustomJWT';
import CustomSession from '@/shared/types/auth/CustomSession';

export const authOptions: AuthOptions = {
  providers: [
    StravaProvider({
      clientId: '78158',
      clientSecret: '518b64884cb8adc8d6ccf9602d2a101d8018a8bd',
      authorization: {
        params: {
          scope: 'profile:read_all,activity:read_all'
        }
      }
      // profile: (profile, tokens) => {
      //     //console.debug({tokens, profile})
      //     return {
      //         id: profile.id,
      //         name: profile.firstname + ' ' + profile.lastname,
      //         email: profile.email,
      //         image: profile.profile_medium,
      //         // Add your custom properties here
      //     }
      // },
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      // console.debug({token, account})
      const customJWT: CustomJWT = {
        ...token
      };
      if (account) {
        customJWT.accessToken = account.access_token;
        customJWT.refreshToken = account.refresh_token;
      }

      return customJWT;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const customSession: CustomSession = {
        ...session,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string
      };
      return customSession;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

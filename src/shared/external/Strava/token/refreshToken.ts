import { Config } from '@/shared/config';
import { TokenSet } from 'next-auth';
import { StravaEndpoints } from '@/shared/external/Strava/endpoints';

export const refreshToken = async (refreshToken: string) => {
  const response = await fetch(StravaEndpoints.token, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: Config.clientId,
      client_secret: Config.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }),
    method: 'POST'
  });

  const tokens: TokenSet = await response.json();

  if (!response.ok) throw tokens;

  return {
    accessToken: tokens.access_token,
    expiry: Math.floor(Date.now() / 1000 + (tokens.expires_at ?? 0)),
    refreshToken: tokens.refresh_token
  };
};

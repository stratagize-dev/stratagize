import { JWT } from 'next-auth/src/jwt';

export interface CustomJWT extends JWT {
  accessToken?: string;
  refreshToken?: string;
}

import { Session } from 'next-auth';

interface CustomSession extends Session {
  athleteId?: string;
  accessToken?: string;
  supabaseToken: string;
  refreshToken?: string;
}

export default CustomSession;

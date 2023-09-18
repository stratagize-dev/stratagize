import { Session } from 'next-auth';

interface CustomSession extends Session {
  athleteId?: string;
  accessToken?: string;
  refreshToken?: string;
}

export default CustomSession;

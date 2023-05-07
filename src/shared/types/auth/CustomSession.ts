import { Session } from 'next-auth';

interface CustomSession extends Session {
  accessToken?: string;
  refreshToken?: string;
}

export default CustomSession;

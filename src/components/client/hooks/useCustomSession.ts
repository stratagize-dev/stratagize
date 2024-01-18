import { useSession } from 'next-auth/react';
import CustomSession from '@/shared/types/auth/CustomSession';

export default function useCustomSession() {
  const { status, update, data } = useSession();

  const customSession = data !== null ? (data as CustomSession) : null;
  return {
    status,
    athleteId: customSession ? Number(customSession.athleteId) : undefined,
    customSession,
    update
  };
}

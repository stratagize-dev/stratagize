import { useSession } from 'next-auth/react';
import CustomSession from '@/shared/types/auth/CustomSession';

export default function useCustomSession() {
  const { status, update, data } = useSession();

  return {
    status,
    customSession: data !== null ? (data as CustomSession) : null,
    update
  };
}

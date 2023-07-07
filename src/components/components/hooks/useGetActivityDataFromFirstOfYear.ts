import { useEffect, useState } from 'react';
import { getActivityDataFromFirstOfYear } from '@/shared/data/getActivityData';
import { ActivitySummary } from '@/shared/types/ActivitySummary';
import { useSession } from 'next-auth/react';
import CustomSession from '@/shared/types/auth/CustomSession';

export default function useGetActivityDataFromFirstOfYear() {
  const { status, data: sessionData } = useSession();

  const [data, setData] = useState<ActivitySummary[]>([]);
  const [loading, setLoading] = useState(false);

  const session = sessionData as CustomSession | null;

  useEffect(() => {
    if (session?.accessToken) {
      setLoading(true);
      getActivityDataFromFirstOfYear(session?.accessToken).then(value => {
        setData(value);
        setLoading(false);
      });
    }
  }, [session?.accessToken]);

  return { data, loading };
}

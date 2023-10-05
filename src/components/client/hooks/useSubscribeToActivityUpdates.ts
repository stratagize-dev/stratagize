import { useEffect, useState } from 'react';
import { db } from '@/shared/db';
import { Activity } from '@/shared/types/Activity';
import useCustomSession from '@/components/client/hooks/useCustomSession';
import { RealtimeChannel } from '@supabase/realtime-js';

export default function useSubscribeToActivityUpdates(
  athleteId: number,
  activities: Activity.Row[]
) {
  const [updatedActivities, setUpdatedActivities] =
    useState<Activity.Row[]>(activities);

  const { customSession } = useCustomSession();
  useEffect(() => {
    let channel: RealtimeChannel | undefined = undefined;
    if (customSession) {
      channel = db(customSession.supabaseToken)
        .channel('Activity Updates')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'activities'
          },
          payload => {
            const newActivity: Activity.Row | undefined =
              payload.new as Activity.Row;

            if (newActivity?.athlete_id === athleteId) {
              setUpdatedActivities(prevState => [
                ...prevState,
                payload.new as Activity.Row
              ]);
            }
          }
        )
        .subscribe();
    }

    return () => {
      if (customSession && channel) {
        void db(customSession.supabaseToken).removeChannel(channel);
      }
    };
  }, [athleteId, customSession]);

  return updatedActivities;
}

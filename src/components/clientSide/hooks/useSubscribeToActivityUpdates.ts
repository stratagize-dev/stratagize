import { useEffect, useState } from 'react';
import { db } from '@/shared/db';
import { Activity } from '@/shared/types/Activity';

export default function useSubscribeToActivityUpdates(
  athleteId: number,
  activities: Activity.Row[]
) {
  const [updatedActivities, setUpdatedActivities] =
    useState<Activity.Row[]>(activities);

  useEffect(() => {
    const channel = db
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

    return () => {
      void db.removeChannel(channel);
    };
  }, [db, athleteId]);

  return updatedActivities;
}

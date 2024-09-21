import useCustomSession from '@/components/client/hooks/useCustomSession';
import { useEffect, useRef } from 'react';
import { RealtimeChannel } from '@supabase/realtime-js';
import { db } from '@/shared/db';
import { Notification } from '@/shared/types/Notification';

function useAthleteNotifications(
  notificationAction: (notification: Notification.Row) => void
) {
  const { customSession, athleteId } = useCustomSession();

  const channel = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (customSession && athleteId && !channel.current) {
      const client = db(customSession.supabaseToken);

      channel.current = client
        .channel('athlete notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications'
          },
          payload => {
            const newActivity: Notification.Row | undefined =
              payload.new as Notification.Row;

            if (newActivity?.athlete_id === athleteId) {
              notificationAction(newActivity);
            }
          }
        )
        .subscribe();
    }

    return () => {
      channel.current?.unsubscribe();
      channel.current = null;
    };
  }, [customSession, athleteId, notificationAction]);
}

export { useAthleteNotifications };

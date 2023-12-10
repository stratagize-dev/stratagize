'use client';

import { useEffect } from 'react';
import useCustomSession from '@/components/client/hooks/useCustomSession';
import { RealtimeChannel } from '@supabase/realtime-js';
import { db } from '@/shared/db';
import { Notification } from '@/shared/types/Notification';
import toast from 'react-hot-toast';

export default function Notifications() {
  const { customSession } = useCustomSession();
  useEffect(() => {
    let channel: RealtimeChannel | undefined = undefined;

    if (customSession) {
      channel = db(customSession.supabaseToken)
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

            if (
              newActivity?.athlete_id ===
              parseInt(customSession.athleteId ?? '0')
            ) {
              toast.success(newActivity.message);
            }
          }
        )
        .subscribe();
    }

    return () => {
      if (customSession && channel) {
        void channel.unsubscribe();
      }
    };
  }, [customSession]);
  return <></>;
}

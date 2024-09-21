'use client';

import React, { useState } from 'react';
import { SpaceTravel } from '@/components/client/space-travel';
import { useRouter } from 'next/navigation';
import { useAthleteNotifications } from '@/components/hooks/useAthleteNotifications';

export default function ClientLoading() {
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  useAthleteNotifications(notification => {
    if (notification.type === 'onboarding-completed') {
      // Redirect to the home page when the component is mounted
      router.push('/');
    } else {
      setMessage(notification.message);
    }
  });

  return <SpaceTravel messageToDisplay={message} />;
}

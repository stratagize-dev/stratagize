'use client';

import { CustomMenu } from '@/components/CustomMenu/CustomMenu';
import { useEffect, useState } from 'react';
import { activityService } from '@/shared/services/activityService';
import useCustomSession from '@/components/client/hooks/useCustomSession';
import { db } from '@/shared/db';
import { MenuItemProps } from '@/components/CustomMenu/components/MenuItem';

export function SportsMenu() {
  const { customSession } = useCustomSession();

  const [sportsMenuItems, setSportsMenuItems] = useState<MenuItemProps[]>([]);

  useEffect(() => {
    if (customSession && customSession.accessToken && customSession.athleteId) {
      activityService(db(customSession.supabaseToken))
        .getSportTypesForAthlete(parseInt(customSession.athleteId))
        .then(value => {
          if (value?.data) {
            setSportsMenuItems(
              value.data.map(d => ({
                buttonText: d.sport_type
              })) as MenuItemProps[]
            );
          }
        });
    }
  }, [customSession]);

  return <CustomMenu text="Sports" menuItems={sportsMenuItems} />;
}

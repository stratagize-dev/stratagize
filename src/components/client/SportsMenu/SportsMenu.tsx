'use client';

import { CustomMenu } from '@/components/CustomMenu/CustomMenu';
import { useEffect, useState } from 'react';
import { activityService } from '@/shared/services/activityService/activityService';
import useCustomSession from '@/components/client/hooks/useCustomSession';
import { db } from '@/shared/db';
import { MenuItemProps } from '@/components/CustomMenu/components/MenuItem';
import { useRouter } from 'next/navigation';
import { SportType } from '@/shared/types/Activity';
import { formatSportsTypeName } from '@/shared/formatting';

const supportedSports: SportType[] = [
  'AlpineSki',
  'BackcountrySki',
  'Hike',
  'Kayaking',
  'MountainBikeRide',
  'RockClimbing',
  'Run',
  'Snowshoe',
  'StandUpPaddling',
  'TrailRun',
  'VirtualRide',
  'WeightTraining',
  'Walk',
  'Workout',
  'Yoga'
];
export function SportsMenu() {
  const { customSession } = useCustomSession();
  const router = useRouter();

  const [sportsMenuItems, setSportsMenuItems] = useState<MenuItemProps[]>([]);

  useEffect(() => {
    if (customSession && customSession.accessToken && customSession.athleteId) {
      activityService(db(customSession.supabaseToken))
        .getSportTypesForAthlete(parseInt(customSession.athleteId))
        .then(value => {
          if (value?.data) {
            const allMenuItems = value.data
              .filter(d => supportedSports.includes(d.sport_type as SportType))
              .map(d => ({
                buttonText: formatSportsTypeName(d.sport_type as SportType),
                onClick: () => router.push(`/sport/${d.sport_type}`)
              })) as MenuItemProps[];

            setSportsMenuItems(allMenuItems);
          }
        });
    }
  }, [customSession, router]);

  return <CustomMenu text="Sports" menuItems={sportsMenuItems} />;
}

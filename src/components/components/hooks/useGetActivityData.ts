import { useEffect, useState } from 'react';
import {
  getActivityData,
  getActivityDataFromFirstOfYear
} from '@/shared/data/getActivityData';
import { ActivitySummary } from '@/shared/types/ActivitySummary';
import { useSession } from 'next-auth/react';
import CustomSession from '@/shared/types/auth/CustomSession';
import { useAtom } from 'jotai';
import {
  activitiesAtom,
  lastActivityDateAtom
} from '@/components/components/state/atoms';
import { startOfYear, subMonths, subWeeks } from 'date-fns';

function mergeData(
  existingActivities: ActivitySummary[],
  newActivities: ActivitySummary[]
) {
  return existingActivities.reduce((workingArray, existingActivity) => {
    const newActivityToMerge = newActivities.find(
      newActivity => newActivity.id === existingActivity.id
    );

    if (newActivityToMerge) {
      workingArray.push(newActivityToMerge);
    } else {
      workingArray.push(existingActivity);
    }
    return workingArray;
  }, [] as ActivitySummary[]);
}

export default function useGetActivityData() {
  const { data: sessionData } = useSession();
  const [storedActivities, setStoredActivities] = useAtom(activitiesAtom);
  const [lastActivityDateString, setLastActivityDate] =
    useAtom(lastActivityDateAtom);
  const [loading, setLoading] = useState(false);
  const [hasFetchedLatestData, setHasFetchedLatestData] = useState(false);

  const session = sessionData as CustomSession | null;

  const handleLatestActivities = ({
    latestActivities,
    shouldMergeData
  }: {
    shouldMergeData: boolean;
    latestActivities: ActivitySummary[];
  }) => {
    const newLastActivityDateString =
      latestActivities[latestActivities.length - 1].startDate;

    const activities = shouldMergeData
      ? mergeData(storedActivities, latestActivities)
      : latestActivities;

    setStoredActivities(activities);
    setLastActivityDate(newLastActivityDateString);
    setLoading(false);
    setHasFetchedLatestData(true);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (hasFetchedLatestData) return;

    if (session?.accessToken) {
      if (lastActivityDateString === undefined) {
        // Load all data from beginning of year

        setLoading(true);
        getActivityDataFromFirstOfYear(session?.accessToken, signal).then(
          latestActivities =>
            handleLatestActivities({ latestActivities, shouldMergeData: false })
        );
      } else {
        const lastActivityDate = new Date(lastActivityDateString);
        const oneMonthPrior = subMonths(lastActivityDate, 1);
        const yearStart = startOfYear(new Date());

        if (oneMonthPrior < yearStart) {
          setLoading(true);
          getActivityDataFromFirstOfYear(session?.accessToken, signal).then(
            latestActivities =>
              handleLatestActivities({
                latestActivities,
                shouldMergeData: false
              })
          );
        } else {
          const twoWeeksPrior = subWeeks(lastActivityDate, 2);
          setLoading(true);
          getActivityData(session?.accessToken, signal, twoWeeksPrior).then(
            latestActivities =>
              handleLatestActivities({
                latestActivities,
                shouldMergeData: true
              })
          );
        }
      }
    }

    return () => {
      controller?.abort();
    };
  }, [session?.accessToken, lastActivityDateString]);

  return { data: storedActivities, loading };
}

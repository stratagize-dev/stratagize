// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerCustomSession } from '@/shared/auth';
import {
  getActivityDataFromFirstOfYear,
  getSummaryActivityData,
  loadActivityDataFromFirstOfYear
} from '@/shared/data/Strava/getSummaryActivityData';
import {
  getActivitiesForAthlete,
  saveSummaryActivities
} from '@/shared/services/activityService';
import { startOfYear, subMonths, subWeeks } from 'date-fns';
import CustomSession from '@/shared/types/auth/CustomSession';

async function getFromBeginningOfYear(session: CustomSession) {
  const summaryActivities = await loadActivityDataFromFirstOfYear(
    session.accessToken
  );

  const { data, error } = await saveSummaryActivities(summaryActivities);

  return NextResponse.json({ name: 'success', data, error });
}

export async function GET(request: NextRequest) {
  const session = await getServerCustomSession();

  if (session && session.athleteId) {
    const athleteId = session.athleteId;

    const { data, error } = await getActivitiesForAthlete(athleteId);

    if (data?.length === 0) {
      return await getFromBeginningOfYear(session);
    } else {
      if (data) {
        const lastActivityDateString = data[data.length - 1].start_date;
        const lastActivityDate = new Date(lastActivityDateString);

        const oneMonthPrior = subMonths(lastActivityDate, 1);
        const yearStart = startOfYear(new Date());

        if (oneMonthPrior < yearStart) {
          loadActivityDataFromFirstOfYear(session.accessToken).then(
            latestActivities =>
              handleLatestActivities({
                latestActivities,
                shouldMergeData: false
              })
          );
        } else {
          const twoWeeksPrior = subWeeks(lastActivityDate, 2);
          getSummaryActivityData(
            session?.accessToken,
            signal,
            twoWeeksPrior
          ).then(latestActivities =>
            handleLatestActivities({
              latestActivities,
              shouldMergeData: true
            })
          );
        }
        return NextResponse.json({ name: 'valid blah ' });
      }
    }

    return NextResponse.json({ name: 'valid', data, error });
  } else {
    return NextResponse.json({ name: 'not authenticated' });
  }
}

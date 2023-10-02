import { activityService } from '@/shared/services/activityService';
import Stats from '@/components/client/Stats';
import ClientSide from '@/components/client/ClientSide';
import CustomSession from '@/shared/types/auth/CustomSession';

interface Props {
  athleteId: number;
  athleteHourGoal: number;
  session: CustomSession;
}

export default async function ActivityLoadingScreen({
  athleteId,
  athleteHourGoal,
  session
}: Props) {
  const { data: activities } = await activityService.getActivitiesForAthlete(
    athleteId
  );

  return (
    <ClientSide session={session}>
      <Stats
        athleteId={athleteId}
        activities={activities ?? []}
        goalHours={athleteHourGoal}
      />
    </ClientSide>
  );
}

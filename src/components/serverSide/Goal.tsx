import Stats from '@/components/components/Stats';
import { activityService } from '@/shared/services/activityService';
import CustomSession from '@/shared/types/auth/CustomSession';

interface Props {
  session: CustomSession;
}
export default async function Goal({ session }: Props) {
  const athleteId = Number(session?.athleteId);

  const { data: activities, error } =
    await activityService().getActivitiesForAthlete(athleteId);

  if (error) {
    return <>An error occured loading the activities</>;
  }
  if (activities) {
    return (
      <>
        <div>Goal</div>
        <Stats activities={activities} />
      </>
    );
  } else {
    return <>No Data</>;
  }
}

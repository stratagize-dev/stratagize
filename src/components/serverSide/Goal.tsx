import Stats from '@/components/components/Stats';
import { activityService } from '@/shared/services/activityService';
import { Athlete } from '@/shared/types/Athlete';

interface Props {
  athlete: Athlete.Row;
}
export default async function Goal({ athlete }: Props) {
  const { data: activities, error } =
    await activityService().getActivitiesForAthlete(athlete.id);

  if (error) {
    return <>An error occured loading the activities</>;
  }
  if (activities) {
    return (
      <>
        <Stats activities={activities} goalHours={athlete.hour_goal} />
      </>
    );
  } else {
    return <>No Data</>;
  }
}

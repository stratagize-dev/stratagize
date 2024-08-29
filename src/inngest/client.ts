import { EventSchemas, Inngest } from 'inngest';
type Athlete = {
  data: {
    athleteId: number;
  };
};

type AthleteData = {
  data: {
    athleteId: number;
    pageNumber: number;
    pageSize: number;
  };
};

type Events = {
  'athlete/begin-onboarding': Athlete;
  'athlete/finalize-onboarding': Athlete;
  'activity/load': AthleteData;
};

export const inngest = new Inngest({
  id: 'stratagize',
  schemas: new EventSchemas().fromRecord<Events>()
});

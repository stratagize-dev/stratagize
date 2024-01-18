import { Database } from '../../../database.types';

type AthleteTable = Database['public']['Tables']['athletes'];

export namespace Athlete {
  export type Row = AthleteTable['Row'];
  export type Insert = AthleteTable['Insert'];
  export type Update = AthleteTable['Update'];
}

export type OnboardingStatus = Database['public']['Enums']['onboarding_status'];

import { Database } from '../../../database.types';
type JobQueueTable = Database['public']['Tables']['job_queue'];

export namespace JobQueue {
  export type Row = JobQueueTable['Row'];
  export type Insert = JobQueueTable['Insert'];
  export type Update = JobQueueTable['Update'];
}

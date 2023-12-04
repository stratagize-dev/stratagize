import { Database } from '../../../database.types';
export type JobQueueTable = Database['public']['Tables']['job_queue'];

export type JobStatus = Database['public']['Enums']['job_status'];

export namespace JobQueue {
  export type Row = JobQueueTable['Row'];
  export type Insert = JobQueueTable['Insert'];
  export type Update = JobQueueTable['Update'];
}

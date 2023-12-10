import { Database } from '../../../database.types';
type NotificationTable = Database['public']['Tables']['notifications'];

export namespace Notification {
  export type Row = NotificationTable['Row'];
  export type Insert = NotificationTable['Insert'];
  export type Update = NotificationTable['Update'];
}

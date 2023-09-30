import { SportType } from '@/shared/types/Activity';

export interface StravaEvent {
  aspect_type: 'create' | 'update' | 'delete';
  event_time: number;
  object_id: number;
  object_type: 'activity' | 'athlete';
  owner_id: number;
  subscription_id: number;
  updates: {
    title?: string;
    type?: SportType;
    private?: boolean;
    visibility?: 'everyone' | 'followers_only' | 'only_me';
  };
}

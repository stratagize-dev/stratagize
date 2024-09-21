export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activities: {
        Row: {
          achievement_count: number | null
          athlete_count: number | null
          athlete_id: number
          average_speed: number | null
          average_watts: number | null
          comment_count: number | null
          created_at: string
          detailed_event: Json | null
          device_watts: boolean | null
          distance: number | null
          elapsed_time: number | null
          elev_high: number | null
          elev_low: number | null
          id: number
          kilojoules: number | null
          kudos_count: number | null
          max_speed: number | null
          max_watts: number | null
          moving_time: number
          name: string
          sport_type: Database["public"]["Enums"]["sport_type"]
          start_date: string
          start_date_local: string | null
          timezone: string | null
          total_elevation_gain: number | null
          weighted_average_watts: number | null
          year: number
        }
        Insert: {
          achievement_count?: number | null
          athlete_count?: number | null
          athlete_id: number
          average_speed?: number | null
          average_watts?: number | null
          comment_count?: number | null
          created_at?: string
          detailed_event?: Json | null
          device_watts?: boolean | null
          distance?: number | null
          elapsed_time?: number | null
          elev_high?: number | null
          elev_low?: number | null
          id: number
          kilojoules?: number | null
          kudos_count?: number | null
          max_speed?: number | null
          max_watts?: number | null
          moving_time: number
          name: string
          sport_type: Database["public"]["Enums"]["sport_type"]
          start_date: string
          start_date_local?: string | null
          timezone?: string | null
          total_elevation_gain?: number | null
          weighted_average_watts?: number | null
          year: number
        }
        Update: {
          achievement_count?: number | null
          athlete_count?: number | null
          athlete_id?: number
          average_speed?: number | null
          average_watts?: number | null
          comment_count?: number | null
          created_at?: string
          detailed_event?: Json | null
          device_watts?: boolean | null
          distance?: number | null
          elapsed_time?: number | null
          elev_high?: number | null
          elev_low?: number | null
          id?: number
          kilojoules?: number | null
          kudos_count?: number | null
          max_speed?: number | null
          max_watts?: number | null
          moving_time?: number
          name?: string
          sport_type?: Database["public"]["Enums"]["sport_type"]
          start_date?: string
          start_date_local?: string | null
          timezone?: string | null
          total_elevation_gain?: number | null
          weighted_average_watts?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "activities_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      athletes: {
        Row: {
          created_at: string
          hour_goal: number
          id: number
          is_onboarded: boolean
          onboarding_status: Database["public"]["Enums"]["onboarding_status"]
          refresh_token: string | null
        }
        Insert: {
          created_at?: string
          hour_goal: number
          id: number
          is_onboarded: boolean
          onboarding_status?: Database["public"]["Enums"]["onboarding_status"]
          refresh_token?: string | null
        }
        Update: {
          created_at?: string
          hour_goal?: number
          id?: number
          is_onboarded?: boolean
          onboarding_status?: Database["public"]["Enums"]["onboarding_status"]
          refresh_token?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          athlete_id: number
          created_at: string | null
          is_delivered: boolean | null
          message: string
          notification_id: number
          type: Database["public"]["Enums"]["notification_type"] | null
        }
        Insert: {
          athlete_id: number
          created_at?: string | null
          is_delivered?: boolean | null
          message: string
          notification_id?: number
          type?: Database["public"]["Enums"]["notification_type"] | null
        }
        Update: {
          athlete_id?: number
          created_at?: string | null
          is_delivered?: boolean | null
          message?: string
          notification_id?: number
          type?: Database["public"]["Enums"]["notification_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_athletes_id_fk"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      strava_events: {
        Row: {
          created_at: string | null
          data: Json
          id: number
          is_processed: boolean
        }
        Insert: {
          created_at?: string | null
          data: Json
          id?: number
          is_processed?: boolean
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: number
          is_processed?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      athlete_sport_all_time_stats: {
        Row: {
          athlete_id: number | null
          avg_distance: number | null
          avg_elevation_gain: number | null
          avg_moving_time: number | null
          max_distance: number | null
          max_elevation_gain: number | null
          max_moving_time: number | null
          max_speed: number | null
          max_watts: number | null
          sport_type: Database["public"]["Enums"]["sport_type"] | null
          total_achievements: number | null
          total_activities: number | null
          total_distance: number | null
          total_elevation_gain: number | null
          total_kudos: number | null
          total_moving_time: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_sport_types: {
        Row: {
          athlete_id: number | null
          sport_type: Database["public"]["Enums"]["sport_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_sport_yearly_stats: {
        Row: {
          athlete_id: number | null
          avg_distance: number | null
          avg_elevation_gain: number | null
          avg_moving_time: number | null
          max_distance: number | null
          max_elevation_gain: number | null
          max_moving_time: number | null
          max_speed: number | null
          max_watts: number | null
          sport_type: Database["public"]["Enums"]["sport_type"] | null
          total_achievements: number | null
          total_activities: number | null
          total_distance: number | null
          total_elevation_gain: number | null
          total_kudos: number | null
          total_moving_time: number | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_yearly_summary: {
        Row: {
          athlete_id: number | null
          max_distance: number | null
          max_elevation_gain: number | null
          max_moving_time: number | null
          max_speed: number | null
          max_watts: number | null
          total_achievements: number | null
          total_activities: number | null
          total_distance: number | null
          total_elevation_gain: number | null
          total_kudos: number | null
          total_moving_time: number | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      max_activity_distance: {
        Row: {
          athlete_id: number | null
          distance: number | null
          id: number | null
          name: string | null
          sport_type: Database["public"]["Enums"]["sport_type"] | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      max_activity_elevation: {
        Row: {
          athlete_id: number | null
          id: number | null
          name: string | null
          sport_type: Database["public"]["Enums"]["sport_type"] | null
          total_elevation_gain: number | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      notification_type: "onboarding-completed"
      onboarding_status:
        | "not-started"
        | "in-progress"
        | "partially-complete"
        | "complete"
        | "error"
      sport_type:
        | "AlpineSki"
        | "BackcountrySki"
        | "Badminton"
        | "Canoeing"
        | "Crossfit"
        | "EBikeRide"
        | "Elliptical"
        | "EMountainBikeRide"
        | "Golf"
        | "GravelRide"
        | "Handcycle"
        | "HighIntensityIntervalTraining"
        | "Hike"
        | "IceSkate"
        | "InlineSkate"
        | "Kayaking"
        | "Kitesurf"
        | "MountainBikeRide"
        | "NordicSki"
        | "Pickleball"
        | "Pilates"
        | "Racquetball"
        | "Ride"
        | "RockClimbing"
        | "RollerSki"
        | "Rowing"
        | "Run"
        | "Sail"
        | "Skateboard"
        | "Snowboard"
        | "Snowshoe"
        | "Soccer"
        | "Squash"
        | "StairStepper"
        | "StandUpPaddling"
        | "Surfing"
        | "Swim"
        | "TableTennis"
        | "Tennis"
        | "TrailRun"
        | "Velomobile"
        | "VirtualRide"
        | "VirtualRow"
        | "VirtualRun"
        | "Walk"
        | "WeightTraining"
        | "Wheelchair"
        | "Windsurf"
        | "Workout"
        | "Yoga"
        | "Unknown"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never


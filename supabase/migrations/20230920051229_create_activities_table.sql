create table
    public.activities (
                          id bigint not null,
                          created_at timestamp with time zone not null default now(),
                          athlete_id bigint not null,
                          moving_time bigint not null,
                          sport_type public.sport_type not null,
                          name character varying not null,
                          start_date timestamp with time zone not null,
                          start_date_local timestamp with time zone null,
                          detailed_event jsonb null,
                          constraint activity_pkey primary key (id),
                          constraint activities_athlete_id_fkey foreign key (athlete_id) references athletes (id) on delete cascade
) tablespace pg_default;
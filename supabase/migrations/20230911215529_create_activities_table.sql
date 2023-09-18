create table
    public."activities" (
                          id bigint not null,
                          created_at timestamp with time zone not null default now(),
                          athlete_id bigint not null,
                          moving_time bigint not null,
                          sport_type text not null,
                          name character varying not null,
                          start_date timestamp with time zone not null,
                          start_date_local timestamp with time zone null,
                          constraint Activity_pkey primary key (id)
) tablespace pg_default;
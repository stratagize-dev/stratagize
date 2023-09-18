create table
    public."athletes" (
                            id bigint not null,
                            created_at timestamp with time zone not null default now(),
                            hour_goal bigint not null,
                            is_onboarded boolean not null,
                            constraint Athlete_pkey primary key (id)
) tablespace pg_default;
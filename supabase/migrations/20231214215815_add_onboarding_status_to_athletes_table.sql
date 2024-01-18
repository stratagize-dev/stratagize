alter table "public"."athletes"
    add column "onboarding_status" onboarding_status not null default 'not-started'::onboarding_status;



CREATE  EXTENSION pg_cron;

-- Run this in PSQL to schedule pooling workers 20 seconds apart:
SET statement_timeout TO 0;
CREATE OR REPLACE FUNCTION schedule_jobs()
    RETURNS VOID
AS $body$
BEGIN
    -- Schedule retry job
    PERFORM cron.schedule(
            'job_queue_unprocessed',
            '* * * * *',
            $$ SELECT job_queue_unprocessed(); $$
            );
    -- Schedule second job with a 20-second delay
    PERFORM pg_sleep(20);

    PERFORM cron.schedule(
            'job_queue_processing',
            '* * * * *',
            $$ SELECT job_queue_processing(); $$
            );

    PERFORM cron.schedule(
                   'retry_failed_jobs',
                   '*/10 * * * *',
                   $$ SELECT job_queue_failed(); $$
           );

END;
$body$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION job_queue_remove_completed()
    RETURNS VOID AS $$

BEGIN

    PERFORM net.http_post(
            url:='https://valid-factual-barnacle.ngrok-free.app/api/job-queue/completed',
            body:='{}'::JSONB,
            params:='{}'::JSONB,
            headers:='{}'::JSONB,
            timeout_milliseconds:=2000
            );

END;
$$ LANGUAGE plpgsql;

SELECT cron.schedule(
               'job_queue_remove_completed',
               '*/5 * * * *',
               $$ SELECT job_queue_remove_completed(); $$
       );
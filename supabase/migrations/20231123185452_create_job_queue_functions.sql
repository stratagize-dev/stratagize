CREATE OR REPLACE FUNCTION job_queue_new()
    RETURNS VOID AS $$

BEGIN

    PERFORM net.http_post(
            url:='https://valid-factual-barnacle.ngrok-free.app/api/job-queue/new',
            body:='{}'::JSONB,
            params:='{}'::JSONB,
            headers:='{}'::JSONB,
            timeout_milliseconds:=2000
            );

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION job_queue_processing()
    RETURNS VOID AS $$

BEGIN

    PERFORM net.http_post(
            url:='https://valid-factual-barnacle.ngrok-free.app/api/job-queue/processing',
            body:='{}'::JSONB,
            params:='{}'::JSONB,
            headers:='{}'::JSONB,
            timeout_milliseconds:=2000
            );

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION job_queue_retry()
    RETURNS VOID AS $$

BEGIN

    PERFORM net.http_post(
            url:='https://valid-factual-barnacle.ngrok-free.app/api/job-queue/retry',
            body:='{}'::JSONB,
            params:='{}'::JSONB,
            headers:='{}'::JSONB,
            timeout_milliseconds:=2000
            );

END;
$$ LANGUAGE plpgsql;

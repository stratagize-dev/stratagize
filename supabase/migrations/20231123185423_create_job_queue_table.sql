CREATE type job_status as ENUM (
    'new',
    'processing',
    'failed',
    'complete',
    'unable-to-complete'
    );

CREATE TABLE job_queue
(
    job_id      serial PRIMARY KEY,
    http_verb   TEXT NOT NULL CHECK (http_verb IN ('GET', 'POST', 'DELETE')),
    payload     jsonb,
    status      job_status NOT NULL DEFAULT 'new',
    retry_count INTEGER       DEFAULT 0,
    retry_limit INTEGER       DEFAULT 10,
    url_path    TEXT          DEFAULT '',
    content     TEXT          DEFAULT '',
    created_at  TIMESTAMPTZ   DEFAULT NOW()
);






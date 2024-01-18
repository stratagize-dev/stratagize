CREATE OR REPLACE VIEW "public"."job_queue_status_summary" as
SELECT count(job_id),
       status
FROM job_queue
GROUP BY status




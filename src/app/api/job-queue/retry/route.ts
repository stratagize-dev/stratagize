import { NextResponse } from 'next/server';
import { createJobQueueRepository } from '@/shared/repository/jobQueueRespository';
import serviceRoleDb from '@/shared/serviceRoleDb';
import { batchSize } from '@/app/api/job-queue/constants';
import { logDatabaseError } from '@/shared/logging/logDatabaseError';
import { JobHandlerPayload } from '@/app/api/job-handler/types';
import logError from '@/shared/logging/logError';

export async function POST() {
  console.log('retrying failed jobs');

  const jobsRepository = await createJobQueueRepository(serviceRoleDb);

  const { data, error } = await jobsRepository.findByStatusAndDate(
    'retry',
    new Date(),
    batchSize
  );

  if (error) {
    logDatabaseError('an error occured retrieving failed jobs', error);
    return NextResponse.error();
  } else {
    if (data) {
      data.forEach(dataItem => {
        if (dataItem.url_path) {
          const payload: JobHandlerPayload<unknown> = {
            jobId: dataItem.job_id,
            payload: dataItem.payload
          };
          fetch(dataItem.url_path, {
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload),
            method: 'POST'
          });
        } else {
          logError(`missing job url_path for job number ${dataItem.job_id}`);
        }
      });
    }
    return NextResponse.json({ status: 'ok' });
  }
}

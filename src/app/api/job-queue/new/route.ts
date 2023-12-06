import { NextResponse } from 'next/server';
import serviceRoleDb from '@/shared/serviceRoleDb';
import { logDatabaseError } from '@/shared/logging/logDatabaseError';
import { createJobQueueRepository } from '@/shared/repository/jobQueueRespository';
import { batchSize } from '@/app/api/job-queue/constants';
import { JobQueue } from '@/shared/types/JobQueue';

export async function POST() {
  console.log('looking for new jobs');

  const jobsRepository = await createJobQueueRepository(serviceRoleDb);
  const { data, error } = await jobsRepository.findByStatus('new', batchSize);

  if (error) {
    logDatabaseError('an error occured retrieving unprocessed jobs', error);
    return NextResponse.error();
  } else {
    if (data) {
      const processing = data?.map(
        job => ({ ...job, status: 'processing' }) as JobQueue.Insert
      );
      const jobsRepository = await createJobQueueRepository(serviceRoleDb);

      await jobsRepository.upsert(processing);
    }
    return NextResponse.json({ status: 'ok' });
  }
}

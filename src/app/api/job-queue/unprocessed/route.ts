import { NextResponse } from 'next/server';
import serviceRoleDb from '@/shared/serviceRoleDb';
import { logDatabaseError } from '@/shared/logging/logDatabaseError';
import { createJobQueueRepository } from '@/shared/repository/jobQueueRespository';
import { batchSize } from '@/app/api/job-queue/constants';

export async function POST() {
  console.log('looking for unprocessed jobs');

  const { data, error } = await serviceRoleDb
    .from('job_queue')
    .select('*')
    .order('job_id', { ascending: true })
    .eq('status', '')
    .limit(batchSize);

  if (error) {
    logDatabaseError('an error occured retrieving unprocessed jobs', error);
    return NextResponse.error();
  } else {
    if (data) {
      const processing = data?.map(job => ({ ...job, status: 'processing' }));
      const jobsRepository = await createJobQueueRepository(serviceRoleDb);

      await jobsRepository.upsert(processing);
    }
    return NextResponse.json({ status: 'ok' });
  }
}

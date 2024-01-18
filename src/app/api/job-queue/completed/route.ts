import { NextResponse } from 'next/server';
import serviceRoleDb from '@/shared/serviceRoleDb';
import { logDatabaseError } from '@/shared/logging/logDatabaseError';
import { createJobQueueRepository } from '@/shared/repository/jobQueueRespository';

export async function POST() {
  console.log('deleting completed jobs');

  const jobsRepository = await createJobQueueRepository(serviceRoleDb);
  const { data, error } = await jobsRepository.delete('complete');

  logDatabaseError('an error occured retrieving complete jobs', error);

  return error ? NextResponse.error() : NextResponse.json({ status: 'ok' });
}

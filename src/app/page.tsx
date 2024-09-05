import { getAuthDetails } from '@/shared/auth';
import { Suspense } from 'react';
import OnboardingScreen from '@/components/client/components/components/OnboardingScreen';
import { SkeletonBone } from '@/components/SkeletoneBone';
import AnnualGoal from '@/components/client/components/components/components/components/components/AnnualGoal';
import HorizontalSpacer from '@/components/HorizontalSpacer';

function Skeleton() {
  return (
    <div className="pb-4">
      <div className="grid grid-cols-6 gap-4 place-items-center max-w-4xl text-5xl font-bold  text-purple-500 ">
        <SkeletonBone className="w-80 h-12 col-span-6 md:col-span-3" />
        <SkeletonBone className="w-36 h-12 col-span-3 md:col-span-2 text-gray-500 " />
        <SkeletonBone className="w-36 h-12 col-span-3 md:col-span-1 " />
      </div>
      <HorizontalSpacer />
    </div>
    // <div className='flex flex-col gap-5'>
    //   <SkeletonBone className='w-full h-20 p-4' />
    //   <SkeletonBone className='w-full h-72' />
    //   <SkeletonBone className='w-full h-24' />
    //   <SkeletonBone className='w-full h-24' />
    // </div>;
    // <div className="flex flex-col gap-2">
    //   {Array.from({ length: 5 }, (_, index) => (
    //     <div
    //       key={`bonePrefix-${index}`}
    //       className="flex w-full items-center justify-between py-2 pl-3 pr-4"
    //     >
    //       <div className="flex items-center gap-x-3">
    //         <div className="inline-flex items-center gap-x-3">
    //           <SkeletonBone className="size-[34px] rounded-full" />
    //           <div className="inline-flex flex-col gap-1">
    //             <SkeletonBone className="h-3 w-16" />
    //             <SkeletonBone className="h-3 w-20" />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="flex size-7 items-center justify-center">
    //         <SkeletonBone className="h-4 w-4" />
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}
export default async function Home() {
  const { athleteId, session } = await getAuthDetails();

  return (
    <Suspense fallback={<Skeleton />}>
      <OnboardingScreen athleteId={athleteId} session={session} />{' '}
    </Suspense>
  );
}

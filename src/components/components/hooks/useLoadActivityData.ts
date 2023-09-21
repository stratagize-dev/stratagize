// import { useSession } from 'next-auth/react';
// import CustomSession from '@/shared/types/auth/CustomSession';
// import { useEffect, useState } from 'react';
// import { db } from '@/shared/db';
// import { Activity } from '@/shared/types/Activity';
// import { PostgrestError } from '@supabase/supabase-js';
//
// /**
//  * load all existing activity data for user from API
//  */
// export default function useLoadActivityData() {
//   const { data: sessionData } = useSession();
//
//   const athleteId = (sessionData as CustomSession).athleteId;
//
//   const [activityData, setActivityData] = useState<Activity[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [getDataError, setGetDataError] = useState<PostgrestError | null>(null);
//
//   useEffect(() => {
//     const getData = async () => {
//       const { data, error } = await db
//         .from('activities')
//         .select('*')
//         .eq('athlete_id', Number(athleteId));
//
//       setGetDataError(error);
//       setActivityData(data ?? []);
//     };
//     setLoading(true);
//     void getData();
//   }, []);
//
//   return {
//     loading,
//     data: activityData,
//     error: getDataError
//   };
// }

import React from 'react';
import { getTripsStatsAction } from '@/lib/server-actions/get-trips-stats';
import toast from 'react-hot-toast';
import { getServerUserSession } from '@/lib/getServerUserSession';
import { CheckCircle, Clock, Plane } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export async function MyTripsStats() {
  const { data, error } = await getTripsStatsAction();
  const session = await getServerUserSession();

  if (error) {
    return <p className='text-red-500 text-center'>{error}</p>;
  }
  if (!data || (data?.all && data.all === 0)) {
    return <div>No trips stats was found.</div>;
  }
  return (
    <div>
      <div className='flex gap-6 flex-wrap flex-col'>
        <h2>Welcome back {session?.user?.name}</h2>

        <div className='flex items-end justify-between'>
          <div className='flex gap-6 flex-wrap'>
            <Link href={'/my-trips?type=all'}>
              <div className='flex items-center gap-2 p-4 cursor-pointer bg-green-200  rounded-md hover:bg-green-400 hover:scale-105 scale-100 transition-all duration-300 ease-in-out'>
                <Plane size={20} />
                <h3 className='dark:text-black'>Trips : {data?.all}</h3>
              </div>
            </Link>

            <Link href={'/my-trips?type=planned'}>
              <div className='flex items-center gap-2  p-4 cursor-pointer bg-yellow-200 rounded-md hover:bg-yellow-400 hover:scale-105 scale-100 transition-all duration-300 ease-in-out'>
                <Clock size={20} />
                <h3 className='dark:text-black'>Planned : {data?.planned}</h3>
              </div>
            </Link>

            <Link href={'/my-trips?type=completed'}>
              <div className='flex items-center gap-2  p-4 cursor-pointer bg-purple-200 rounded-md hover:bg-purple-400 hover:scale-105 scale-100 transition-all duration-300 ease-in-out'>
                <CheckCircle size={20} />
                <h3 className='dark:text-black'>
                  Completed : {data?.completed}
                </h3>
              </div>
            </Link>
          </div>
          <Link href={'/my-trips/new-trip'}>
            <Button classNameCustome='px-12 flex items-center gap-2'>
              New trip <Plane size={15} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

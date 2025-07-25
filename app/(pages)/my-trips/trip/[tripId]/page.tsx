import { Container } from '@/components/grid/Container';
import { PreviewStarRate } from '@/components/TripSinglePage/PreviewStarRate';
import { TabsSectionView } from '@/components/TripSinglePage/TabsSectionView';
import { Loader } from '@/components/ui/loader';
import { Spacer } from '@/components/ui/spacer';
import { getSingleTripAction } from '@/lib/server-actions/get-single-trip';
import { Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Travel-Plan / Trip',
  description: 'Travel ,Plan and Enjoy your trips',
};

async function SingleTripPage({
  params,
}: {
  params: Promise<{
    tripId: string;
  }>;
}) {
  const paramTripId = (await params).tripId;

  const { data: tripData, error } = await getSingleTripAction({
    tripId: paramTripId,
  });

  if (!tripData && !error) {
    return <Loader />;
  }
  if (error) {
    return <p className='text-red-500 text-center'>{error}</p>;
  }

  return (
    <Container>
      <div className='flex justify-between items-center'>
        <div className='flex justify-between items-center w-[80%]'>
          <h2 className='line-clamp-2 w-[75%]'>{tripData?.title}</h2>

          {tripData && tripData.starRate !== null && tripData?.starRate > 0 && (
            <div className='w-[20%]'>
              <PreviewStarRate rate={tripData?.starRate} />
            </div>
          )}
        </div>

        <Link href={`/my-trips/edit-trip/${paramTripId}`}>
          <div className='p-1 transition-all hover:bg-green-500 rounded-full bg-green-200/50 flex items-center justify-center  cursor-pointer'>
            <Edit />
          </div>
        </Link>
      </div>
      <Spacer size={2} />
      <div className='flex gap-4 '>
        <Image
          src={tripData?.imageUrl || ''}
          alt='image'
          width={800}
          height={600}
          className='object-cover object-center   rounded-md aspect-video w-[80%]'
        />
        <div className='flex flex-col gap-4 w-[20%]'>
          <div>
            <p className='font-bold'>Location</p>
            <p>{tripData?.location}</p>
          </div>

          <div>
            <p>
              <strong>From:</strong> {tripData?.startDate.toDateString()}
            </p>
            <p>
              <strong>To:</strong> {tripData?.endDate.toDateString()}
            </p>
          </div>

          {tripData?.linkUrl && (
            <div>
              <p className='font-bold'>Link</p>
              <Link href={tripData?.linkUrl || ''}>
                <p>{tripData?.linkTitle}</p>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Spacer size={6} />

      <div className='w-[80%]'>
        <p className='whitespace-pre-wrap'>{tripData?.description}</p>
      </div>
      <Spacer size={12} />
      {tripData && <TabsSectionView tripData={tripData} />}
    </Container>
  );
}

export default SingleTripPage;

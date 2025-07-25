'use server';
import { v2 as cloudinary } from 'cloudinary';

import { prisma } from '../prisma';
import { Trip } from '../generated/prisma';
import { getServerUserSession } from '../getServerUserSession';
import { revalidatePath } from 'next/cache';

export async function deleteTripAction(tripId: string, imageId: string) {
  const session = await getServerUserSession();

  if (!session || !session.user || !session.user.email) {
    throw new Error('You must be logged in to delet a trip');
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: session.user.email || '',
      },
    });

    if (!foundUser) {
      throw new Error('User not found');
    }

    if (!imageId) {
      throw new Error('Image Id is required');
    }

    const deleteImage = await cloudinary.uploader.destroy(imageId, {
      resource_type: 'image',
    });

    if (deleteImage.error) {
      console.log('🚀 ~ DELETE ~ deleteImage.error:', deleteImage.error);

      throw new Error('Failed to delete image');
    }

    const deletedTrip: Trip | null = await prisma.trip.delete({
      where: {
        userId: foundUser.id,
        id: tripId,
      },
    });

    if (!deletedTrip) {
      throw new Error('Failed to delete trip');
    }
    revalidatePath('/my-trips');
  } catch (error: any) {
    console.error('Error deleting trip:', error);
  }
}

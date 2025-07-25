'use server';

import { getServerUserSession } from '../getServerUserSession';
import { prisma } from '../prisma';

export async function getLocationsAction() {
  const session = await getServerUserSession();
  if (!session || !session.user || !session.user.email) {
    throw new Error('You must be logged in to get locations');
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

    const locations = await prisma.trip.findMany({
      where: {
        userId: foundUser.id,
      },
      select: {
        location: true,
        lattitude: true,
        lngitude: true,
      },
    });

    if (!locations) {
      throw new Error('No locations were found');
    }

    return {
      data: locations,
      error: undefined,
    };
  } catch (error: any) {
    return {
      data: null,
      error: `Failed to get locations: ${error.message}`,
    };
  }
}

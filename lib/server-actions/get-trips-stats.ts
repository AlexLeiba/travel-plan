'use server';

import { getServerUserSession } from '../getServerUserSession';
import { prisma } from '../prisma';

export async function getTripsStatsAction() {
  const session = await getServerUserSession();
  const currentDate = new Date();

  if (!session || !session?.user || !session?.user?.email) {
    throw new Error('You must be logged in to get trips');
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

    const trips = await prisma.trip.findMany({
      where: {
        userId: foundUser.id,
      },
    });

    if (!trips) {
      throw new Error('No trips was found');
    }

    const plannedTrips = trips.filter(
      (trip) => trip.startDate.getTime() >= currentDate.getTime()
    ).length;
    const completedTrips = trips.length - plannedTrips;
    const allTrips = trips.length;

    return {
      data: {
        planned: plannedTrips,
        completed: completedTrips,
        all: allTrips,
      },
      error: undefined,
    };
  } catch (error: any) {
    return {
      data: null,
      error: `Failed to get trips: ${error.message}`,
    };
  }
}

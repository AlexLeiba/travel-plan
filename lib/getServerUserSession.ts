// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth/next';

export async function getServerUserSession() {
  const session: { user: { email: string; name: string } } | null =
    await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  return session;
}

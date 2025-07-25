import { Slider } from '@/components/DashboardPage/Carousel/Slider';
import { HeroSection } from '@/components/DashboardPage/HeroSection';
import { Container } from '@/components/grid/Container';
import { Spacer } from '@/components/ui/spacer';
import { CAROUSEL_DATA } from '@/lib/consts';
import { Metadata } from 'next';

const baseUrl = 'https://travel-plan-chi-flame.vercel.app/';

export const metadata: Metadata = {
  title: 'Travel-Plan',
  description:
    'Save your best moments and destinations. Enjoy the travel experience each time you visit your profile. Keep track of all visited places, and plan your next trips :)',
  openGraph: {
    title: 'Travel-Plan',
    description:
      'Save your best moments and destinations. Enjoy the travel experience each time you visit your profile. Keep track of all visited places, and plan your next trips :)',
    url: baseUrl,
    siteName: 'Travel-Plan',
    images: [
      {
        url: 'https://res.cloudinary.com/deixj28ym/image/upload/v1753366145/travel-plan/pgzkzx8zyt3atpcrowgv.png', // Full URL required
        width: 1200,
        height: 630,
        alt: 'Travel-plan home page',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function Home() {
  return (
    <div className='w-full h-full'>
      <Container>
        <HeroSection />
        <Spacer sm={6} md={6} lg={6} />

        <Slider title='App Gallery' carouselData={CAROUSEL_DATA} />
      </Container>
    </div>
  );
}

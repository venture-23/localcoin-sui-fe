import LandingPage from '../container/landingpage';

export const runtime = 'edge';

export const metadata = {
  description: 'Connecting Communities, One Transaction at a Time',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <LandingPage />
      {/* <HomePageContain /> */}
    </>
  );
}

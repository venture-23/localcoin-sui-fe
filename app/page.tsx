import LandingPage from '../container/landingpage';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
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

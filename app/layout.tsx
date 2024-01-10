// import Navbar from 'components/layout/navbar';
import { GeistSans } from 'geist/font';
import { ReactNode, Suspense } from 'react';
import Providers from 'utils/provider';
const { SITE_NAME } = process.env;
const baseUrl = 'http://localhost:3000';
// const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
// const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;
import { AppleSplashScreen } from 'components/layout/splash-screen';
import PinLockScreen from 'components/pin-lock-screen';
import '../styles/index.scss';
import { getCookiedata } from './action';
import './globals.css';

export const metadata = {
  // metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  manifest: '/manifest.json',
  robots: {
    follow: false,
    index: false
  }
  // ...(twitterCreator &&
  //   twitterSite && {
  //     twitter: {
  //       card: 'summary_large_image',
  //       creator: twitterCreator,
  //       site: twitterSite
  //     }
  //   })
};

// export const metadata: Metadata = {
//   manifest: '/manifest.json' // we are accessing our manifest file here
//   // ... other options
// };

export default async function RootLayout({ children }: { children: ReactNode }) {
  const res = await getCookiedata();
  return (
    <html lang="en" className={GeistSans.variable}>
      <link rel="apple-touch-icon" href="/apple_touch.png" type="image/png" sizes="180*180" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Apple Web App" />
      <link href="/apple_touch.png" rel="apple-touch-startup-image" sizes="2048x2732" />
      <AppleSplashScreen />
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <Suspense>
          <Providers>
            <main className="">
              <PinLockScreen isInCached={!!res} cookieValue={res || ''}>
                {children}
              </PinLockScreen>
            </main>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}

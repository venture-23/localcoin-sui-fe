// import Navbar from 'components/layout/navbar';
import { GeistSans } from 'geist/font';
import { ReactNode, Suspense } from 'react';

const { SITE_NAME } = process.env;
const baseUrl = 'http://localhost:3000';
// const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
// const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;
import './globals.css';
import RootLayoutClient from './pin-lock-layout';

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
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        {/* <Navbar /> */}
        <Suspense>
          <main>
            <RootLayoutClient>{children}</RootLayoutClient>
          </main>
        </Suspense>
      </body>
    </html>
  );
}

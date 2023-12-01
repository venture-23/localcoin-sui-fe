'use client';
import { QrCodeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Footer() {
  const asPath = usePathname();
  const [hideFooter, setHideFooter] = useState(false);
  useEffect(() => {
    const footerCheck =
      asPath.includes('scan-pay') ||
      asPath.includes('confirmation') ||
      asPath.includes('signuppage');
    if (footerCheck) setHideFooter(footerCheck);
    return () => setHideFooter(false);
  }, [asPath]);
  return (
    <>
      {!hideFooter && (
        <footer
          className="fixed  bottom-0 h-[73px] w-full bg-white
     text-sm shadow-[0px_-8px_24px_rgba(0,0,0,0.2)]"
        >
          <div className="relative">
            <Link
              href="/recipient/scan-pay"
              className="absolute -top-[30px] left-1/2 flex h-20 w-20 -translate-x-1/2 items-center rounded-full border-[6px] border-white bg-blue-500 p-3"
            >
              <QrCodeIcon className="text-white" />
            </Link>
          </div>
        </footer>
      )}
    </>
  );
}

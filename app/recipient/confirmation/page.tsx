'use client';

import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Header from 'components/layout/header';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function confirmation() {
  const [openConfirmation, setopenConfirmation] = useState(false);

  useEffect(() => {
    // setopenConfirmation(true);
  }, []);
  return (
    <>
      <Header className="h-[120px]">
        <div className="flex items-center">
          <Link href="/">{'<- '}</Link>
          <p className="flex-1  text-center text-2xl font-semibold">Confirmation Page</p>
        </div>
      </Header>
      <section className="py-6">
        <div className="container mx-auto">
          <div className="grid gap-4 rounded-md bg-white p-4">
            <div>
              <p className="font-bold">Store Name</p>
              <p>ABC store</p>
            </div>
            <div>
              <p className="font-bold">Merchant Addres</p>
              <p>0x7c123bhtys</p>
            </div>
            <div>
              <p className="font-bold">Token </p>
              <p>50$</p>
            </div>
          </div>
          <div className="mt-6">
            <button onClick={() => setopenConfirmation(true)} className="button-primary ">
              Pay
            </button>
          </div>
        </div>
      </section>

      {openConfirmation && (
        <div>
          <div
            data-state="open"
            className="pointer-events-none fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            // style="pointer-events: auto;"
            data-aria-hidden="true"
            aria-hidden="true"
          ></div>

          <div className="fixed left-[50%] top-[50%]  z-50 grid  w-[90%] w-full translate-x-[-50%] translate-y-[-50%] justify-center  justify-items-center gap-4 rounded-lg bg-white p-6 shadow-lg">
            <CheckCircleIcon className="h-24 w-24 text-green-500" />
            <div className="text-center">
              <h1 className="text-2xl font-bold">Payment Sucessful</h1>
              <p className="text-slate-500">Payment to 0z5122x7xa8sv0 was successful.</p>
            </div>
            <Link href="/recipient">
              <button className="button-primary w-full">Done</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import {
  ArrowDownOnSquareStackIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import Header from 'components/layout/header';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import PopupBox from 'components/popover';
import Button from 'components/botton';

export default function confirmation() {
  const [openConfirmation, setopenConfirmation] = useState(false);
  const popOverRef = useRef<any>(null);

  useEffect(() => {
    // setopenConfirmation(true);
  }, []);
  return (
    <>
      <section className="">
        <div className="container mx-auto">
          <div className="flex items-center pt-10 mb-6">
            <Link href="/">
              <ArrowLeftIcon width={24} height={24} />
            </Link>
            <p className="flex-1 text-2xl font-semibold text-center">Confirmation Page</p>
          </div>
          <div className="grid gap-4 p-4 bg-white rounded-md">
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
              <p>$ 50</p>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={() => {
                // setOpen(false);
                // setIsOpenPopup(true);
                popOverRef.current.open({
                  title: '',
                  imageUrl: '',
                  messageTitle: 'Payment Sucessful',
                  message: 'Your Payment is sucessful',
                  type: 'success'
                });
              }}
              className="button-primary "
            >
              Pay
            </button>
          </div>

          <PopupBox ref={popOverRef}>
            <a
              onClick={() => {
                popOverRef.current.close({});
              }}
              download
              className="w-full"
            >
              <Button
                // buttonIcon={<ArrowDownOnSquareStackIcon width={24} height={24} />}
                text="Done"
              />
            </a>
          </PopupBox>
        </div>
      </section>
    </>
  );
}

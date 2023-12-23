'use client';
import {
  ArrowDownOnSquareStackIcon,
  BuildingStorefrontIcon,
  ChevronDoubleDownIcon,
  GlobeEuropeAfricaIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import Card from 'components/card';
import { useAddToHomescreenPrompt } from 'components/test';
import { useEffect, useRef } from 'react';
// import Header from 'components/layout/header';

import Button from 'components/botton';
import PopupBox from 'components/popover';
import Link from 'next/link';

const SignupPage = () => {
  const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();
  const popOverRef = useRef<any>(null);

  useEffect(() => {
    popOverRef && showPopup();
  }, [promptable]);
  const showPopup = () => {
    // setOpen(false);
    // setIsOpenPopup(true);
    popOverRef?.current?.open({
      title: '',
      messageTitle: 'Install LocalCoin',
      message: 'Add to your homescreen',
      // type: 'success'
      downloadIcon: <ArrowDownOnSquareStackIcon width={48} height={48} />
    });
  };
  return (
    <>
      {/* <Header className="h-[120px]">
        <div className="flex items-center">
          <Link href="/">{'<- '}</Link>
          <p className="flex-1 text-2xl font-semibold text-center">LocalCoin</p>
        </div>
      </Header> */}

      <section className="bg-[#F7F8FA] ">
        <div className="container mx-auto ">
          {/* <Link href="/">{'<- '}</Link> */}
          <div className="pt-10 mb-10 ">
            <h1 className=" text-heading">
              Signup <span className="font-normal">with your desired role.</span>{' '}
            </h1>
            {promptable && !isInstalled ? (
              <>
                {/* <buton onClick={() => promptToInstall()}>INSTALL APP</buton> */}

                {/* <div className="mt-6">
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
                </div> */}

                <PopupBox ref={popOverRef}>
                  <a onClick={() => promptToInstall()} download className="w-full">
                    <Button
                      // buttonIcon={<ArrowDownOnSquareStackIcon width={24} height={24} />}
                      text="Add"
                    />
                  </a>
                </PopupBox>
              </>
            ) : null}
            {/*  */}
          </div>
          <div className="flex flex-col justify-between gap-24">
            <div className="grid gap-5">
              <Card
                title="Merchant"
                link="/signup/merchant"
                iconName={<BuildingStorefrontIcon className="w-8 h-8 text-primary" />}
              />
              <Card
                title="Recipient"
                link="/signup/recipient"
                iconName={<UserCircleIcon className="w-8 h-8 text-primary" />}
              />
              <Card
                title="Campaign Creator"
                link="/signup/campaign"
                iconName={<GlobeEuropeAfricaIcon className="w-8 h-8 text-primary" />}
              />
            </div>
          </div>
          <div className="absolute flex items-baseline justify-center w-full text-lg font-semibold -translate-x-1/2 text-color bottom-4 left-1/2">
            <p className="font-normal">Already have an account? </p>{' '}
            <Link href="/">
              {' '}
              <span className="ml-1">Login</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;

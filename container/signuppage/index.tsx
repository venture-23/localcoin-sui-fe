'use client';

import {
  BuildingStorefrontIcon,
  GlobeEuropeAfricaIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import Card from 'components/card';
import { useAddToHomescreenPrompt } from 'components/test';
// import Header from 'components/layout/header';

import Link from 'next/link';

const SignupPage = () => {
  const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();

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
          <div className="mb-10 ">
            <h1 className=" text-heading">
              Signup <span className="font-normal">with your desired role.</span>{' '}
            </h1>
            {promptable && !isInstalled ? (
              <buton onClick={() => promptToInstall()}>INSTALL APP</buton>
            ) : null}
            {/*  */}
          </div>
          <div className="flex flex-col justify-between gap-24">
            <div className="grid gap-5">
              <Card
                title="Merchant"
                link="/signup/merchant"
                iconName={<BuildingStorefrontIcon className="h-8 w-8 text-primary" />}
              />
              <Card
                title="Recipient"
                link="/signup/recipient"
                iconName={<UserCircleIcon className="h-8 w-8 text-primary" />}
              />
              <Card
                title="Campaign Creator"
                link="/signup/campaign"
                iconName={<GlobeEuropeAfricaIcon className="h-8 w-8 text-primary" />}
              />
            </div>
          </div>
          <div className="text-color absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 items-baseline justify-center text-lg font-semibold">
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

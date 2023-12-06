import {
  BuildingStorefrontIcon,
  GlobeEuropeAfricaIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import Button from 'components/botton';
import Card from 'components/card';
// import Header from 'components/layout/header';

import Link from 'next/link';

const SignupPage = () => {
  return (
    <>
      {/* <Header className="h-[120px]">
        <div className="flex items-center">
          <Link href="/">{'<- '}</Link>
          <p className="flex-1  text-center text-2xl font-semibold">LocalCoin</p>
        </div>
      </Header> */}

      <section className="bg-[#F7F8FA] ">
        <div className="container mx-auto ">
          {/* <Link href="/">{'<- '}</Link> */}
          <div className="mb-10 ">
            <h1 className=" text-heading">
              Signup <span className="font-normal">with your desired role.</span>{' '}
            </h1>
            {/*  */}
          </div>
          <div className="flex h-[400px] flex-col justify-between">
            <div className="grid gap-5">
              <Card
                title="Merchant"
                link="/signup/merchant"
                iconName={<BuildingStorefrontIcon className="h-8 w-8 text-[#1384F5]" />}
              />
              <Card
                title="Recipient"
                link="/signup/recipient"
                iconName={<UserCircleIcon className="h-8 w-8 text-[#1384F5]" />}
              />
              <Card
                title="Campaign Creator"
                link="/signup/campaign"
                iconName={<GlobeEuropeAfricaIcon className="h-8 w-8 text-[#1384F5]" />}
              />
            </div>
            <div className="text-color flex items-baseline justify-center  text-lg font-semibold">
              <p className="font-normal">Already have an account? </p>{' '}
              <Link href="/">
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;

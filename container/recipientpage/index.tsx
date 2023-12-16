import { HeartIcon, ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
import Card from 'components/card';
import RecipientFunded from 'components/icons/recipient-funded';
import RecipientOngoing from 'components/icons/recipient-ongoing';
import RecipientToken from 'components/icons/recipient-token';
import Image from 'next/image';
import Link from 'next/link';

const RecipientPage = () => {
  const tokenDetails: any = { name: 'Token1', value: '10.11' };
  const campaignDetails: any = {
    id: 1,
    title: 'Nourish Every Soul',
    description:
      'Join us in our mission to provide hope and nourishment to those in need with our "Nourish Eve...'
  };
  return (
    <>
      {/* <Header className="h-[120px]">
        <div className="flex items-center">
          <p className="flex-1 text-2xl font-semibold text-center">Recipient profile</p>
        </div>
      </Header> */}
      {/* <Link href="/">{'<- '}</Link> */}
      <section className="">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-between ">
            <p className="text-heading mt-3">Recipient Profile</p>
            <div className="h-12 w-12 rounded-full bg-gray-600"></div>
          </div>
          <div
            className=" mb-6 w-full max-w-[208px]  rounded-lg p-5 text-white"
            style={{
              background: 'linear-gradient(180deg, #1384F5 0%, #4EABFE 100%)'
            }}
          >
            <div className="flex flex-col items-center justify-center ">
              <div>
                <HeartIcon width={64} height={64} />
              </div>
              <p className="text-lg font-semibold"> Health</p>
            </div>
            <div className="mt-4 flex items-center justify-between ">
              <p className="font-normal">Balance</p>
              <div className="flex items-center gap-1 ">
                <Image alt="coin" src="/coin.png" width={16} height={16} /> <p>120</p>
              </div>
            </div>
          </div>

          <div className="mb-6 ">
            <div className="grid gap-3 ">
              {/* <TokenCard cardContainerClass=" justify-between" tokenDetails={tokenDetails} /> */}
              <div className="grid gap-5">
                <Card title="Your Tokens" link="/recipient/tokens" iconName={<RecipientToken />} />
                <Card
                  title="Ongoing Campaigns"
                  link="/recipient/campaigns"
                  iconName={<RecipientOngoing />}
                />
                <Card title="Funded Campaigns" link="/" iconName={<RecipientFunded />} />
              </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full">
              <Button
                link="/recipient/scan-pay"
                text="scan to pay"
                underline="rounded-none capitalize py-5"
                buttonIcon={<ViewfinderCircleIcon width={24} height={24} />}
              />
            </div>
          </div>

          {/* <div className="">
            <div className="flex justify-between mb-4">
              <h2 className="mb-2 text-2xl font-bold">Ongoing Campaigns</h2>
              <Link href="/recipient/campaigns">
                <p className="mb-2"> View All</p>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <CampaignCard
                cardContainerClass="min-h-[50px] flex-col "
                campaignDetails={campaignDetails}
              />
              <CampaignCard
                cardContainerClass="min-h-[50px] min-h-[50px] flex-col"
                campaignDetails={campaignDetails}
              />
              <CampaignCard
                cardContainerClass="min-h-[50px] min-h-[50px] flex-col"
                campaignDetails={campaignDetails}
              />
            </div>
          </div> */}

          {/* <div className="pb-6 mb-6 border-b ">
            <div className="flex justify-between mb-4">
              <h2 className="mb-2 text-2xl font-bold">Funded Campaigns</h2>
              <Link href="/recipient/campaigns">
                <p className="mb-2"> View All</p>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <FundedCampagins title="Nourish" date="20 Dec" amount="XLM 80" />
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default RecipientPage;

import CampaignCard from 'components/campaigncard';
import Header from 'components/layout/header';
import TokenCard from 'components/tokencard';
import Link from 'next/link';
import FundedCampagins from './funded-campagns';
import Card from 'components/card';
import {
  BuildingStorefrontIcon,
  GlobeEuropeAfricaIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

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
            <p className="text-heading">Recipient Profile</p>
            <div className="h-12 w-12 rounded-full bg-gray-600"></div>
          </div>
          <div className="mb-6 border-b pb-6 ">
            <div className="grid gap-3 ">
              <TokenCard cardContainerClass=" justify-between" tokenDetails={tokenDetails} />
              <div className="grid gap-5">
                <Card
                  title="Your Tokens"
                  link="/signup/merchant"
                  iconName={<BuildingStorefrontIcon className="text-primary h-8 w-8" />}
                />
                <Card
                  title="Ongoing Campaigns"
                  link="/signup/recipient"
                  iconName={<UserCircleIcon className="text-primary h-8 w-8" />}
                />
                <Card
                  title="Funded Campaigns "
                  link="/signup/campaign"
                  iconName={<GlobeEuropeAfricaIcon className="text-primary h-8 w-8" />}
                />
              </div>
            </div>
          </div>

          <div className="mb-6 border-b pb-6 ">
            <div className="mb-4 flex justify-between">
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
          </div>

          <div className="mb-6 border-b pb-6 ">
            <div className="mb-4 flex justify-between">
              <h2 className="mb-2 text-2xl font-bold">Funded Campaigns</h2>
              <Link href="/recipient/campaigns">
                <p className="mb-2"> View All</p>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <FundedCampagins title="Nourish" date="20 Dec" amount="XLM 80" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecipientPage;

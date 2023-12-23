import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import CampaignCard from 'components/campaigncard';
import Link from 'next/link';

const CampaignList = () => {
  const campaignDetails: any = {
    id: 1,
    title: 'Billboard Junction',
    description: 'No of Recipient : 14'
  };
  return (
    <>
      {/* <Header className="h-[120px]">
        <div className="flex items-center">
          <p className="flex-1 text-2xl font-semibold text-center">Campagin Lists</p>
        </div>
      </Header> */}

      <section>
        <div className="container mx-auto">
          <Link href="/">
            <ArrowLeftIcon width={24} height={24} />
          </Link>
          <div className="flex items-center justify-between mb-6 ">
            <p className="text-heading">Ongoing Campaigns </p>
            <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <CampaignCard campaignDetails={campaignDetails} />
            <CampaignCard campaignDetails={campaignDetails} />
            <CampaignCard campaignDetails={campaignDetails} />
          </div>
        </div>
      </section>
    </>
  );
};

export default CampaignList;

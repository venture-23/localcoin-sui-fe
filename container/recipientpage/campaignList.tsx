'use client';

import CampaignCard from 'components/campaigncard';
import { useMyContext } from 'hooks/useMyContext';
import Link from 'next/link';
import { useState } from 'react';

const CampaignList = () => {
  const campaignDetails: any = {
    id: 1,
    title: 'Billboard Junction',
    description: 'No of Recipient : 14'
  };
  const [campaignList, setCampaignList] = useState([]);
  const { userInfo } = useMyContext();

  return (
    <>
      {/* <Header className="h-[120px]">
        <div className="flex items-center">
          <p className="flex-1 text-2xl font-semibold text-center">Campagin Lists</p>
        </div>
      </Header> */}

      <section>
        <div className="container mx-auto">
          <Link href="/recipient">{'<- '}</Link>
          <div className="mb-6 flex items-center justify-between ">
            <p className="text-heading">Your Campaigns </p>
            <div className="h-12 w-12 rounded-full bg-gray-600"></div>
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

'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import CampaignCard from 'components/campaigncard';
import CampaignListSkeleton from 'components/skeleton/campaign-list';
import { useCamapigns } from 'hooks/useCampaigns';
import Link from 'next/link';
import React from 'react';

const CampaignList = () => {
  const campaignDetails: any = {
    id: 1,
    title: 'Billboard Junction',
    description: 'No of Recipient : 14'
  };

  const { isFetching, campaignList } = useCamapigns({ getOnGoingCampaign: true });
  return (
    <>
      <section>
        <div className="container mx-auto">
          <div className="pt-10">
            <Link href="/recipient">
              <ArrowLeftIcon width={24} height={24} />
            </Link>
            <div className="flex items-center justify-between pt-2 mb-6 ">
              <p className="text-heading">Ongoing Campaigns </p>
              {/* <div className="w-12 h-12 bg-gray-600 rounded-full"></div> */}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {campaignList?.map((eachCampaign: any, eachid: number) => (
              <React.Fragment key={eachid + 1 + ''}>
                <CampaignCard
                  clippedId
                  link={`/recipient/campaigns`}
                  campaignDetails={eachCampaign}
                />
              </React.Fragment>
            ))}
            {!isFetching && campaignList?.length === 0 && <div>No Campaign Created</div>}
            {isFetching && <CampaignListSkeleton defaultData={2} />}
          </div>
        </div>
      </section>
    </>
  );
};

export default CampaignList;

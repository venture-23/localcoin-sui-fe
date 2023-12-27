'use client';

import CampaignCard from 'components/campaigncard';
import PageHeader from 'components/pageheader';
import CampaignListSkeleton from 'components/skeleton/campaign-list';
import { useCamapigns } from 'hooks/useCampaigns';
import React from 'react';

const CampaignList = () => {
  const campaignDetails: any = {
    id: 1,
    title: 'Billboard Junction',
    description: 'No of Recipient : 14'
  };

  const { isFetching, campaignList } = useCamapigns({ fetchAllCampaign: true });
  return (
    <>
      <section>
        <div className="container mx-auto">
          <PageHeader backLink={`/recipient`} pageHeaderTitle={'Ongoing Campaign'} />
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

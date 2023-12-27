'use client';
import CampaignCard from 'components/campaigncard';
import PageHeader from 'components/pageheader';
import CampaignListSkeleton from 'components/skeleton/campaign-list';
import { useCamapigns } from 'hooks/useCampaigns';
import Image from 'next/image';
import React from 'react';

const CampaignList = () => {
  const campaignDetails: any = {
    id: 1,
    title: 'Billboard Junction',
    description: 'No of Recipient : 14'
  };
  const { campaignList, isFetching } = useCamapigns({
    fetchAllCampaign: true
  });

  return (
    <>
      {/* <Header className="h-[120px]">
        <div className="flex items-center">
          <p className="flex-1 text-2xl font-semibold text-center">Campagin Lists</p>
        </div>
      </Header> */}

      <section>
        <div className="container mx-auto">
          <PageHeader backLink={`/`} pageHeaderTitle={'Ongoing Campaigns'} />

          <div className="grid grid-cols-1 gap-3">
            {campaignList?.map((eachCampaign: any, eachid: number) => (
              <React.Fragment key={eachid + 1 + ''}>
                <CampaignCard clippedId link="all-campaigns" campaignDetails={eachCampaign} />
              </React.Fragment>
            ))}
            {!isFetching && campaignList?.length === 0 && (
              <>
                <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-white px-4 py-10">
                  <Image src={'/empty_campaign.png'} width={80} height={80} alt="empty campaign" />
                  <p className="text-center text-textSecondary">
                    No Campaigns created. Add campaigns to see lists of campaigns
                  </p>
                </div>

                <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
                  <Image src={'/empty_campaign._2.png'} width={200} height={200} />
                </div>
              </>
            )}
            {isFetching && <CampaignListSkeleton defaultData={2} />}
          </div>
        </div>
      </section>
    </>
  );
};

export default CampaignList;

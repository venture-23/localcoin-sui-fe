'use client';
import { PlusIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
import CampaignCard from 'components/campaigncard';
import Popover from 'components/popover';
import CampaignListSkeleton from 'components/skeleton/campaign-list';
import { useCamapigns } from 'hooks/useCampaigns';
import { useMyContext } from 'hooks/useMyContext';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useRef, useState } from 'react';

const CampaignList = () => {
  const [showLoader, setShowLoader] = useState(false);
  const pathname = usePathname();
  const { userInfo } = useMyContext();
  const popOverRef = useRef(null);

  const { isFetching, campaignList } = useCamapigns({});

  return (
    <>
      <section className="relative">
        <Popover ref={popOverRef} />
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-between pt-10 ">
            <p className="text-heading">Your Campaigns </p>
            <div className="h-12 w-12 rounded-full bg-gray-600"></div>
          </div>
          {/*  <Button
            text="List Campaign"
            buttonIcon={<PlusIcon width={24} height={24} />}
            underline={
              '!w-fit bg-transparent text-blue-500 border border-primary !text-primary mb-3'
            }
            type="button"
            handleClick={() => _get_campaign_list()}
          >
            List Campaign
          </Button> */}
          <div className="grid grid-cols-1 gap-3">
            {campaignList?.map((eachCampaign: any, eachid: number) => (
              <React.Fragment key={eachid + 1 + ''}>
                <CampaignCard clippedId link="campaign/" campaignDetails={eachCampaign} />
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

            <div className="absolute bottom-0 left-0 w-full">
              <Button
                link="/campaign/create"
                text="Create a Campaign"
                underline="rounded-none capitalize py-5"
                buttonIcon={<PlusIcon width={24} height={24} />}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CampaignList;

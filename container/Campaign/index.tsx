'use client';
import { PlusIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
import CampaignCard from 'components/campaigncard';
import Popover from 'components/popover';
import CampaignListSkeleton from 'components/skeleton/campaign-list';
import { useMyContext } from 'hooks/useMyContext';
import React, { useEffect, useRef, useState } from 'react';
import { campaignServices } from 'services/campaign-services';

const CampaignList = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [campaignList, setCampaignList] = useState([]);
  const { userInfo } = useMyContext();
  const popOverRef = useRef(null);
  useEffect(() => {
    if (userInfo.secretKey) {
      handlelClick();
      // console.log({ userInfo });
    }
  }, [userInfo]);

  const handlelClick = async () => {
    setShowLoader(true);
    await campaignServices
      // SDA3X6LFDLN5SL6KK3CZ4QUBRBWAAUSOL7YOI25TQMMMYYBDFDRY2H7W
      .getCampaigns(userInfo.secretKey)
      // .getCampaigns('SDA3X6LFDLN5SL6KK3CZ4QUBRBWAAUSOL7YOI25TQMMMYYBDFDRY2H7W')
      .then((x) => {
        setCampaignList(x);
        setShowLoader(false);
      })
      .catch((e) => {
        setShowLoader(false);
        popOverRef.current.open({ ...e, title: 'Error', type: 'error' });
      });
  };
  return (
    <>
      <section>
        <Popover ref={popOverRef} />
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-between ">
            <p className="text-heading">Your Campaigns </p>
            <div className="h-12 w-12 rounded-full bg-gray-600"></div>
          </div>
          <Button
            text="List Campaign"
            buttonIcon={<PlusIcon width={24} height={24} />}
            underline={
              '!w-fit bg-transparent text-blue-500 border border-primary !text-primary mb-3'
            }
            type="button"
            onClick={handlelClick}
          >
            List Campaign
          </Button>
          <div className="grid grid-cols-1 gap-3">
            {showLoader && <CampaignListSkeleton defaultData={7} />}
            {campaignList?.map((eachCampaign, eachid) => (
              <React.Fragment key={eachid + 1 + ''}>
                <CampaignCard clippedId link="campaign/" campaignDetails={eachCampaign} />
              </React.Fragment>
            ))}

            <div className="fixed bottom-0 left-0 w-full">
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

'use client';
import { CheckBadgeIcon, PlusIcon, ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
import CampaignCard from 'components/campaigncard';
import { useMyContext } from 'hooks/useMyContext';
import React, { useEffect, useState } from 'react';
import { campaignServices } from 'services/campaign-services';

const CampaignList = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [campaignList, setCampaignList] = useState([]);

  const { userInfo } = useMyContext();
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
        console.log('Error:', e);
      });
    // const resp = await campaignServices.getCampaigns(userInfo.secretKey);
    // console.log({ resp });
    // setShowLoader(false);
    // if (resp?.length) setCampaignList(resp);
  };

  const campaignDetails: any = {
    id: 1,
    title: '12'
  };

  return (
    <>
      <section>
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
            {!showLoader && (
              <>
                <div className="relative w-full rounded bg-white p-4 ">
                  <div className="flex animate-pulse items-center gap-3 space-x-4">
                    <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                    <div className="!ml-0 flex-1 py-1">
                      <div className="h-4 w-[30%] rounded bg-slate-200"></div>
                      <div className="mt-1 h-2 w-[20%] rounded bg-slate-200"></div>
                    </div>
                  </div>
                  <span className="absolute right-6 top-1/2 h-6 w-6 -translate-y-1/2 animate-pulse rounded-full bg-slate-200"></span>
                </div>
              </>
            )}

            <CampaignCard
              link="campaign/"
              cardContainerClass="min-h-[50px] flex-col"
              campaignDetails={campaignDetails}
            />

            {campaignList?.map((eachCampaign, eachid) => (
              <React.Fragment key={eachid + 1 + ''}>
                <CampaignCard link="campaign/" campaignDetails={eachCampaign} />
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

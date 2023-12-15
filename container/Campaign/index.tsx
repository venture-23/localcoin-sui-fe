'use client';
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';
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
  return (
    <>
      {showLoader && 'Loading . . . . .'}
      <section>
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-between ">
            <p className="text-heading">Your Campaigns </p>
            <div className="h-12 w-12 rounded-full bg-gray-600"></div>
          </div>
          <button type="button" onClick={handlelClick}>
            List Campaign
          </button>
          <div className="grid grid-cols-1 gap-3">
            {campaignList.map((eachCampaign, eachid) => (
              <React.Fragment key={eachid + 1 + ''}>
                <CampaignCard link="campaign/" campaignDetails={eachCampaign} />
              </React.Fragment>
            ))}

            <div className="fixed bottom-0 left-0 w-full">
              <Button
                link="/campaign/create"
                text="Create a Campaign"
                underline="rounded-none capitalize py-5"
                buttonIcon={<ViewfinderCircleIcon width={24} height={24} />}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CampaignList;

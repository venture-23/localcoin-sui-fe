'use client';
import CampaignDetails from 'container/recipientpage/campaignDetails';
import { useCamapigns } from 'hooks/useCampaigns';
export default function CampaignDetailsPage({ params }: { params: { campaignid: string } }) {
  console.log({ params });
  const { isDetailsFetching, campaignInfo } = useCamapigns({ id: params.campaignid });
  console.log({ isDetailsFetching, campaignInfo });
  return (
    <>
      {/* <h1>Fetch Details of the campaign {params.campaignid}</h1> */}
      <CampaignDetails
        isDetailsFetching={isDetailsFetching}
        campaignDetails={campaignInfo}
        campaignId={params.campaignid}
      />
    </>
  );
}

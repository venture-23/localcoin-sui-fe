import CampaignDetails from 'container/Campaign/CampaignDetails';

export default function campaignDetails({ params }: { params: { campaignid: string } }) {
  return (
    <>
      <CampaignDetails back="/all-campaigns" campaignId={params.campaignid} />
    </>
  );
}

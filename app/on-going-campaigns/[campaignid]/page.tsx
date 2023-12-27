import CampaignDetails from 'container/Campaign/CampaignDetails';

export default function campaignDetails({ params }: { params: { campaignid: string } }) {
  return (
    <>
      {/* <h1>Fetch Details of the campaign {params.campaignid}</h1> */}
      <CampaignDetails back="/on-going-campaigns" campaignId={params.campaignid} />
    </>
  );
}

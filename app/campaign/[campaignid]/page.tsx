import CampaignDetails from 'container/recipientpage/campaignDetails';
export default function campaignDetails({ params }: { params: { campaignid: string } }) {
  return (
    <>
      {/* <h1>Fetch Details of the campaign {params.campaignid}</h1> */}
      <CampaignDetails back="/campaign" campaignId={params.campaignid} />
    </>
  );
}

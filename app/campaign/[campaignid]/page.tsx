import CampaignDetails from 'container/campaignspage/campaignDetails';
export default function campaignDetails({ params }: { params: { campaignid: string } }) {
  return (
    <>
      {/* <h1>Fetch Details of the campaign {params.campaignid}</h1> */}
      <CampaignDetails campaignId={params.campaignid} />
    </>
  );
}

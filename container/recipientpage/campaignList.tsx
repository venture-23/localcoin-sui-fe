import CampaignCard from 'components/campaigncard';
import Header from 'components/layout/header';
import Link from 'next/link';

const CampaignList = () => {
  const campaignDetails: any = {
    id: 1,
    title: 'Nourish Every Soul',
    description:
      'Join us in our mission to provide hope and nourishment to those in need with our "Nourish Eve...'
  };
  return (
    <>
      <Header className="h-[120px]">
        <div className="flex items-center">
          <Link href="/recipient">{'<- '}</Link>
          <p className="flex-1  text-center text-2xl font-semibold">LocalCoin</p>
        </div>
      </Header>

      <section className="my-6">
        <div className="container mx-auto">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold">Ongoing Campaigns</h2>
          </div>

          <div className="grid grid-cols-1 gap-1">
            <CampaignCard cardContainerClass="min-h-[50px]" campaignDetails={campaignDetails} />
            <CampaignCard cardContainerClass="min-h-[50px]" campaignDetails={campaignDetails} />
            <CampaignCard cardContainerClass="min-h-[50px]" campaignDetails={campaignDetails} />
          </div>
        </div>
      </section>
    </>
  );
};

export default CampaignList;

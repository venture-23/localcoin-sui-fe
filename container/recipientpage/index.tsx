import CampaignCard from 'components/campaigncard';
import Header from 'components/layout/header';
import TokenCard from 'components/tokencard';
import Link from 'next/link';

const RecipientPage = () => {
  const tokenDetails: any = { name: 'Token1', value: '10.11' };
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
          {/* <Link href="/">{'<- '}</Link> */}
          <p className="flex-1  text-center text-2xl font-semibold">LocalCoin</p>
        </div>
      </Header>
      <section className="my-6">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="mb-2 text-2xl font-bold">Recipient Profile</h1>
            <h2 className="mb-2 text-2xl font-bold">Your Tokens</h2>
            <Link href="/recipient/tokens">
              <p className="mb-2"> View All</p>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-1">
            <TokenCard cardContainerClass="min-h-[50px]" tokenDetails={tokenDetails} />
            <TokenCard cardContainerClass="min-h-[50px]" tokenDetails={tokenDetails} />
            <TokenCard cardContainerClass="min-h-[50px]" tokenDetails={tokenDetails} />
          </div>
        </div>
      </section>
      <section className="my-6">
        <div className="container mx-auto">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold">Ongoing Campaigns</h2>
            <Link href="/recipient/campaigns">
              <p className="mb-2"> View All</p>
            </Link>
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

export default RecipientPage;

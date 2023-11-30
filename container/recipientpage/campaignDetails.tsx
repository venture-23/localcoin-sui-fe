import CampaignCard from 'components/campaigncard';
import DetailCampaign from 'components/campaigncard/detail';
import Header from 'components/layout/header';
import Link from 'next/link';

const CampaignDetail = (props: any) => {
  const campaignDetails: any = {
    id: 1,
    title: 'Nourish Every Soul',
    description:
      'Join us in our mission to provide hope and nourishment to those in need with our "Nourish Every Soul" campaign. Together, we aim to offer a warm and hearty dinner to homeless individuals for an entire month. Imagine the impact we can create by ensuring that no one goes to bed hungry, and every soul is embraced with the comfort of a wholesome meal.',
    owner: 'Conor Mcgregor',
    recipient: '13',
    tokentype: 'Token 1'
  };
  return (
    <>
      <Header className="h-[120px]">
        <div className="flex items-center">
          <Link href="/recipient">{'<- '}</Link>
          <p className="flex-1  text-center text-2xl font-semibold">Campaign Details</p>
        </div>
      </Header>

      <section className="my-6">
        <div className="container mx-auto">
          {/* <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold">Campaign {props.campaignId}</h2>
          </div> */}

          <div className="grid grid-cols-1 gap-1">
            {/* <CampaignCard
              cardContainerClass="min-h-[50px] flex-col"
              campaignDetails={campaignDetails}
            /> */}

            <DetailCampaign campaignDetails={campaignDetails} />
          </div>
        </div>
      </section>
    </>
  );
};

export default CampaignDetail;

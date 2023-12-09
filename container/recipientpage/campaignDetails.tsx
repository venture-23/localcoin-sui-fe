import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
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
      {/* <Header className="h-[120px]">
        <div className="flex items-center">
          <p className="flex-1 text-2xl font-semibold text-center">Campaign Details</p>
        </div>
      </Header> */}

      <section>
        <div className="container mx-auto">
          <Link href="/recipient">{'<- '}</Link>
          <div className="mb-6 ">
            <p className="text-heading">Campaign Detail </p>
            {/* <div className="w-12 h-12 bg-gray-600 rounded-full"></div> */}
          </div>
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
        <Button
          link="/merchant/scan-pay"
          text="scan to pay"
          underline="rounded-none capitalize py-5"
          buttonIcon={<ViewfinderCircleIcon width={24} height={24} />}
        />
      </section>
    </>
  );
};

export default CampaignDetail;

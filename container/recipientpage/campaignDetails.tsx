import { ArrowLeftIcon, ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
import DetailCampaign from 'components/campaigncard/detail';
import PageHeader from 'components/pageheader';
import CampaignDetailSkeleton from 'components/skeleton/campagin-details';
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
      <section className="relative">
        <div className="container mx-auto">
          <PageHeader backLink={`/recipient/campaigns`} pageHeaderTitle={'Campaign Details'} />

          {props.isDetailsFetching && !props?.campaignDetails?.name ? (
            <CampaignDetailSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-1">
              <DetailCampaign campaignDetails={props.campaignDetails || {}} />
            </div>
          )}
        </div>

        {!props.isDetailsFetching && (
          <div className="fixed bottom-0 w-full md:absolute">
            <Button
              text="scan to pay"
              link="/recipient/scan-pay"
              disabled={props.isDetailsFetching}
              underline="rounded-none capitalize py-5 "
              buttonIcon={<ViewfinderCircleIcon width={24} height={24} />}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default CampaignDetail;

import Image from 'next/image';
import React from 'react';

interface tokenProps {
  id: string;
  title: string;
  description: string;
  owner: string;
  recipient: string;
  tokentype: string;
}

interface CampaignDetailProps {
  campaignDetails: tokenProps;
}
interface TagProps {
  title: string;
  element: string;
}

const Tag: React.FC<TagProps> = ({ title, element }) => {
  return (
    <div className="">
      <h2 className="font-bold">{title}</h2>
      <p className="text-lg font-normal text-textSecondary ">{element}</p>
    </div>
  );
};

const DetailCampaign: React.FC<CampaignDetailProps> = ({ campaignDetails }) => {
  return (
    <div className="rounded-t-lg bg-white ">
      <div className="relative ">
        <Image src={'/Get_Started/Get_Started.png'} className="" height={900} width={430} />
        <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between rounded-t-lg bg-primary/80 px-6 py-6 text-white ">
          <span></span>
          <div>
            <p className="break-words text-xl font-bold">Billboard Junction</p>
            <p className="break-words text-sm font-medium">By : Robert D. Schawlow</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 p-6">
        {/* <Tag title={'Name'} element={campaignDetails.title} /> */}
        <Tag title={''} element={campaignDetails.description} />
        <div className="rounded border p-4">
          <Tag title={'Campaign Owner'} element={campaignDetails.owner} />
        </div>
        <div className="rounded border p-4">
          <Tag title={'Recipient Number'} element={campaignDetails.recipient} />
        </div>
        <div className="rounded border p-4">
          <Tag title={'Token Type'} element={campaignDetails.tokentype} />
        </div>
      </div>
    </div>
  );
};

export default DetailCampaign;

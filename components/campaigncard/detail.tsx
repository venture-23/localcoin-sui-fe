import React from 'react';
import { maskWalletAddress } from 'utils/clipper';

interface tokenProps {
  id: string;
  title: string;
  description: string;
  owner: string;
  recipient: string;
  tokentype: string;
  token_address: string;
  creator: string;
  no_of_recipients: string;
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
  console.log({ campaignDetails });
  return (
    <div className="rounded-t-lg bg-white ">
      <div className="relative ">
        {/* <Image
          src={'/Get_Started/Get_Started.png'}
          alt="no-image"
          className=""
          height={900}
          width={430}
        /> */}
        <div
          style={{ backgroundImage: 'url("/heading_bg.png")', backgroundSize: 'cover' }}
          className="left-0 top-0 flex h-full w-full flex-col justify-between rounded-t-lg bg-primary/80 px-6 py-6 text-black"
        >
          <div>
            <p className="text-xl font-bold !text-white">
              {campaignDetails?.name || 'Billboard Junction'}{' '}
            </p>
            {campaignDetails?.no_of_recipients && (
              <p className="mt-3 break-words text-sm font-medium text-white">
                {campaignDetails?.no_of_recipients}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="grid gap-4 p-6">
        {/* <Tag title={'Name'} element={campaignDetails.title} /> */}
        <div className="">
          <p className="m-0 text-sm font-semibold"> Description</p>
          <p className="m-0 text-sm">
            <Tag title={''} element={campaignDetails?.description} />
          </p>
        </div>
        <div className="rounded border p-4">
          <Tag title={'Campaign Owner'} element={campaignDetails?.owner} />
          <p>{maskWalletAddress(campaignDetails.creator || '')}</p>
        </div>
        <div className="rounded border p-4">
          <Tag title={'Recipient Number'} element={campaignDetails?.recipient} />
          <p>{campaignDetails.no_of_recipients || ''}</p>
        </div>
        <div className="rounded border p-4">
          <Tag title={'Token Type'} element={campaignDetails?.tokentype} />
          <p>{maskWalletAddress(campaignDetails.token_address || '')}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailCampaign;

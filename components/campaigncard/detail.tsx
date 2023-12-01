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
    <div className="mb-3">
      <h2 className="font-bold">{title}</h2>
      <p className="font-normal text-gray-500">{element}</p>
    </div>
  );
};

const DetailCampaign: React.FC<CampaignDetailProps> = ({ campaignDetails }) => {
  return (
    <div className="rounded-md bg-white p-4 shadow-lg">
      <Tag title={'Name'} element={campaignDetails.title} />
      <Tag title={'Description'} element={campaignDetails.description} />
      <Tag title={'Campaign Owner'} element={campaignDetails.owner} />
      <Tag title={'Recipient Number'} element={campaignDetails.recipient} />
      <Tag title={'Token Type'} element={campaignDetails.tokentype} />
    </div>
  );
};

export default DetailCampaign;

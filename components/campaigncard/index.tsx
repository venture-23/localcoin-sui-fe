import Link from 'next/link';

interface tokenProps {
  id: string;
  title: string;
  description: string;
}
interface CardProps {
  campaignDetails: tokenProps;
  cardInsideClass?: string;
  iconContainerClass?: string;
  cardContainerClass?: string;
}

const CampaignCard: React.FC<CardProps> = ({
  campaignDetails,
  cardContainerClass,
  cardInsideClass
  // iconContainerClass
}) => {
  return (
    <Link href={`/recipient/campaign/${campaignDetails.id}`}>
      <div className={`flex ${cardContainerClass} rounded-md bg-white p-4 shadow-lg`}>
        {/* <div className={`flex flex-col items-center ${cardInsideClass}`}> */}
        {/* <div className={`${iconContainerClass}`}>Icon</div> */}
        <p className="text-xm   mb-2 text-lg font-medium ">{campaignDetails.title}</p>
        {/* <p className="text-base text-gray-700">{description}</p> */}
        {/* </div> */}
        <div className={`flex flex-col items-center ${cardInsideClass}`}>
          <p className="text-xm justify-right mb-0 font-normal text-slate-400 ">
            {campaignDetails.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;

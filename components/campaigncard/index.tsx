'use client';
import { ChevronRightIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
interface tokenProps {
  id: string;
  title: string;
  description: string;
}
interface CardProps {
  // campaignDetails: tokenProps;
  campaignDetails: any;
  cardInsideClass?: string;
  iconContainerClass?: string;
  cardContainerClass?: string;
  id?: string;
  link?: string;
  clippedId?: boolean;
}

const CampaignCard: React.FC<CardProps> = ({
  campaignDetails,
  cardContainerClass,
  cardInsideClass,
  link,
  clippedId = false
  // iconContainerClass
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);

  return (
    <Link href={`${link ? link : pathname}/${campaignDetails.id || campaignDetails.campaign}`}>
      <div className={`flex ${cardContainerClass} rounded bg-white p-5  `}>
        {/* <div className={`flex flex-col items-center ${cardInsideClass}`}> */}
        {/* <div className={`${iconContainerClass}`}>Icon</div> */}
        {/* <p className="text-base text-gray-700">{description}</p> */}
        {/* </div> */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full bg-primary p-2">
              {/* <Image
                alt="camapaign avatar image"
                src={'/campagin_dummy.jpg'}
                width={40}
                height={40}
                className="object-cover w-12 h-12 rounded-full bg-bgGray"
              /> */}

              <GlobeEuropeAfricaIcon width={20} height={20} color="white" />
            </div>
            <div className="max-w-sm">
              <p className="text-base font-semibold text-text">{campaignDetails?.name}</p>
              <p className="mb-0 text-sm text-textSecondary ">{campaignDetails.description}</p>
              {/* {(campaignDetails?.campaign || campaignDetails?.id) && (
                <p className="mb-0 text-xs text-textSecondary ">
                  {maskWalletAddress(campaignDetails?.campaign || campaignDetails?.id)}
                </p>
              )} */}
            </div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EFF8FF]">
            <ChevronRightIcon className="h-3 w-3" />
          </div>
        </div>
        <div className={`flex flex-col items-center ${cardInsideClass}`}></div>
      </div>
    </Link>
  );
};

export default CampaignCard;

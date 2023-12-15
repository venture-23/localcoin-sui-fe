'use client';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
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
}

const CampaignCard: React.FC<CardProps> = ({
  campaignDetails,
  cardContainerClass,
  cardInsideClass,
  link
  // iconContainerClass
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log(url);
    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);

  return (
    <Link href={`${link ? link : pathname}${campaignDetails.id || campaignDetails}`}>
      <div className={`flex ${cardContainerClass} rounded bg-white p-5  `}>
        {/* <div className={`flex flex-col items-center ${cardInsideClass}`}> */}
        {/* <div className={`${iconContainerClass}`}>Icon</div> */}
        {/* <p className="text-base text-gray-700">{description}</p> */}
        {/* </div> */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1">
            <div>
              <Image
                alt="camapaign avatar image"
                src={'/campagin_dummy.jpg'}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full bg-bgGray object-cover"
              />
            </div>
            <div className="max-w-sm">
              <p className="text-lg font-semibold text-text">{campaignDetails.title}</p>
              <p className="mb-0 text-sm font-normal text-textSecondary ">
                {campaignDetails.description}
              </p>
              {!campaignDetails.title && (
                <p className="mb-0 text-sm font-normal text-textSecondary ">{campaignDetails}</p>
              )}
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

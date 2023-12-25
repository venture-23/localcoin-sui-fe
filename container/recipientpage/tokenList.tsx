'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import CampaignListSkeleton from 'components/skeleton/campaign-list';
import TokenCard from 'components/tokencard';
import { useRecipient } from 'hooks/useReceipient';
import Link from 'next/link';

const TokenList = () => {
  const { isFetching, tokenList } = useRecipient();
  return (
    <>
      <section className="">
        <div className="container mx-auto">
          <div className="pt-10">
            <Link href="/recipient">
              <ArrowLeftIcon width={24} height={24} />
            </Link>
            <div className="pt-2 mb-6">
              <h2 className="mb-2 text-2xl font-bold">Your Tokens</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {tokenList?.map((eachToken: any, eachInd: number) => (
              <TokenCard
                key={eachInd + 1 + ''}
                cardContainerClass=" justify-between"
                tokenDetails={eachToken}
              />
            ))}
            {isFetching && <CampaignListSkeleton defaultData={2} />}
          </div>
        </div>
      </section>
    </>
  );
};

export default TokenList;

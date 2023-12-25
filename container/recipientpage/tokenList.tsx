'use client';

import { ArrowLeftIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import PageHeader from 'components/pageheader';
import CampaignListSkeleton from 'components/skeleton/campaign-list';
import TokenCard from 'components/tokencard';
import { useRecipient } from 'hooks/useReceipient';
import Link from 'next/link';

const TokenList = () => {
  const { isFetching, tokenList } = useRecipient({});
  console.log({ tokenList });
  return (
    <>
      <section className="">
        <div className="container mx-auto">
          <PageHeader backLink={`/recipient`} pageHeaderTitle={'Your Tokens'} />

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

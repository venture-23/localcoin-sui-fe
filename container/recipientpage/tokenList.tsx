'use client';

import PageHeader from 'components/pageheader';
import CampaignListSkeleton from 'components/skeleton/campaign-list';
import TokenCard from 'components/tokencard';
import { useRecipient } from 'hooks/useReceipient';
import Image from 'next/image';

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

            {!isFetching && tokenList && tokenList?.length === 0 && (
              <>
                <div className="flex flex-col items-center gap-3 rounded-md bg-white p-4">
                  <Image alt="empty image" src={`/empty_campaign.png`} width={80} height={80} />

                  <p className="text-sm text-textSecondary">You have not received any token yet.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TokenList;

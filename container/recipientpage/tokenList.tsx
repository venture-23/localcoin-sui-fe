import Header from 'components/layout/header';
import TokenCard from 'components/tokencard';
import Link from 'next/link';

const TokenList = () => {
  const tokenDetails: any = { name: 'Token1', value: '10.11' };
  return (
    <>
      {/* <Header className="h-[120px]">
        <div className="flex items-center">
        <p className="flex-1 text-2xl font-semibold text-center">Token List</p>
        </div>
      </Header> */}
      <section className="">
        <div className="container mx-auto">
          <Link href="/recipient">{'<- '}</Link>
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold">Your Tokens</h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <TokenCard cardContainerClass=" justify-between" tokenDetails={tokenDetails} />
            <TokenCard
              iconContainerClass="bg-red-500"
              cardContainerClass=" justify-between"
              tokenDetails={tokenDetails}
            />
            <TokenCard
              iconContainerClass="bg-green-500"
              cardContainerClass=" justify-between"
              tokenDetails={tokenDetails}
            />
            <TokenCard cardContainerClass=" justify-between" tokenDetails={tokenDetails} />
            <TokenCard
              iconContainerClass="bg-red-500"
              cardContainerClass=" justify-between"
              tokenDetails={tokenDetails}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default TokenList;

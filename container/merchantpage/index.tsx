import Header from 'components/layout/header';
import TokenCard from 'components/tokencard';

const RecipientPage = () => {
  const tokenDetails: any = { name: 'Token1', value: '10.11' };
  const settlementDetails: any = { name: 'Request for settlement', value: '10.11' };

  return (
    <>
      <Header className="h-[120px]">
        <div className="flex items-center">
          {/* <Link href="/">{'<- '}</Link> */}
          <p className="flex-1  text-center text-2xl font-semibold">Merchant Profile</p>
        </div>
      </Header>
      <section className="my-6">
        <div className="container mx-auto">
          <div className="mb-6 flex justify-between">
            <h2 className="mb-2 text-2xl font-bold">Your Tokens</h2>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-3">
            <TokenCard
              cardContainerClass="min-h-[50px] justify-between"
              tokenDetails={tokenDetails}
            />
            <TokenCard
              cardContainerClass="min-h-[50px] justify-between"
              tokenDetails={tokenDetails}
            />
            <TokenCard
              cardContainerClass="min-h-[50px] justify-between"
              tokenDetails={tokenDetails}
            />
          </div>

          <div className="">
            <h2 className="mb-2 text-2xl font-bold">Settlements</h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button className="h-[52px] rounded-md bg-blue-500 py-4 text-white">
              Request for settlement
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecipientPage;

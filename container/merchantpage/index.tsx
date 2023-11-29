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
          <p className="flex-1  text-center text-2xl font-semibold">LocalCoin</p>
        </div>
      </Header>
      <section className="my-6">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="mb-2 text-2xl font-bold">Merchant Profile</h1>
            <h2 className="mb-2 text-2xl font-bold">Your Tokens</h2>
          </div>

          <div className="grid grid-cols-1 gap-1">
            <TokenCard cardContainerClass="min-h-[50px]" tokenDetails={tokenDetails} />
            <TokenCard cardContainerClass="min-h-[50px]" tokenDetails={tokenDetails} />
            <TokenCard cardContainerClass="min-h-[50px]" tokenDetails={tokenDetails} />
          </div>
        </div>
      </section>
      <section className="my-6">
        <div className="container mx-auto">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold">Settlements</h2>
          </div>

          <div className="grid grid-cols-1 gap-1">
            <TokenCard cardContainerClass="min-h-[50px]" tokenDetails={settlementDetails} />
            <TokenCard cardContainerClass="min-h-[50px]" tokenDetails={settlementDetails} />
          </div>
        </div>
      </section>
    </>
  );
};

export default RecipientPage;

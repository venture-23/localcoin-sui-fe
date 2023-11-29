import Card from 'components/card';
import Header from 'components/layout/header';
import Link from 'next/link';

export default function Recipient() {
  return (
    <>
      <Header className="h-[120px]">
        <div className="flex items-center">
          <Link href="/">{'<- '}</Link>
          <p className="flex-1  text-center text-2xl font-semibold">Recipient profile</p>
        </div>
      </Header>
      <section className="my-6">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="mb-2 text-2xl font-bold">Signup</h1>
            <p className="max-w-sm text-gray-700">
              LocalCoin is just around the corner. Choose an option below to get started .
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card
              cardContainerClass="justify-center min-h-[134px]"
              title="Merchant"
              link="/merchant"
            />
            <Card
              cardContainerClass="justify-center min-h-[134px]"
              title="Recipient"
              link="/recipient"
            />
            <Card
              cardContainerClass="justify-center min-h-[134px]"
              title="Campaign Creator"
              link="/campaigns"
            />
          </div>
        </div>
      </section>
    </>
  );
}

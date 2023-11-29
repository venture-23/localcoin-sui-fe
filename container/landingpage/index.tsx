import Card from 'components/card';
import Header from 'components/layout/header';

const LandingPage = () => {
  return (
    <>
      <Header className="h-[200px]">
        <p className="flex-1  text-center text-2xl font-semibold">LocalCoin</p>
      </Header>
      <section className="my-6">
        <div className="container mx-auto">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-semibold">Get Started</h2>
            <p className="block text-base font-medium text-gray-600">
              LocalCoin is just around the corner.
            </p>
            <p className="text-sbase lock font-medium text-gray-600">
              Choose an option bellow to get started
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Card
              cardInsideClass="!flex-row gap-3"
              iconContainerClass="rounded-md p-3.5 bg-gray-200 flex items-center justify-center h-[56px] w-[56px]"
              title="Sign up for new account"
              link="/signup"
            />
            <Card
              cardInsideClass="!flex-row gap-3"
              iconContainerClass="rounded-md p-3.5 bg-gray-200 flex items-center justify-center h-[56px] w-[56px]"
              title=" Log in as user"
              link="/"
            />
            <Card
              cardInsideClass="!flex-row gap-3"
              iconContainerClass="rounded-md p-3.5 bg-gray-200 flex items-center justify-center h-[56px] w-[56px]"
              title=" Check ongoing campaigns"
              link="/"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;

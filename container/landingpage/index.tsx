import Card from 'components/card';

const LandingPage = () => {
  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold">Local Coin</h2>
      <label htmlFor="username" className="block text-sm font-medium text-gray-600">
        LocalCoin is just around the corner.
      </label>
      <label htmlFor="username" className="block text-sm font-medium text-gray-600">
        Choose an option bellow to get started
      </label>

      <Card title="-> Sign up for new account" link="/signup" />
      <Card title="-> Log in as user" link="/" />
      <Card title="-> Check ongoing campaigns" link="/" />
    </>
  );
};

export default LandingPage;

import Card from 'components/card';
import Link from 'next/link';

const SignupPage = () => {
  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold">
        <Link href="/">{'<- '}</Link>Sign Up
      </h2>
      <label htmlFor="username" className="block text-sm font-medium text-gray-600">
        Please choose your desired role.
      </label>
      <Card title="-> Merchant" link="/merchant" />
      <Card title="-> Recipient" link="/recipient" />
      <Card title="-> Campaign Creator" link="/campaigns" />
    </>
  );
};

export default SignupPage;

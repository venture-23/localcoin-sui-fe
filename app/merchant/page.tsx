<<<<<<< HEAD
import Header from 'components/layout/header';
import Link from 'next/link';

export default function Merchant() {
  return (
    <>
      <Header className="h-[120px]">
        <div className="flex items-center">
          <Link href="/">{'<- '}</Link>
          <p className="flex-1  text-center text-2xl font-semibold">LocalCoin</p>
        </div>
      </Header>
      <section>
        <div></div>
      </section>
=======
import MerchantPage from 'container/merchantpage';
export default function Recipient() {
  return (
    <>
      <MerchantPage />
>>>>>>> 50925df1402f2a6f0ef2523818691352a689cb31
    </>
  );
}

'use client';

import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { ConfirmationScreen } from 'components/confirmationScreen';
import { useMerchant } from 'hooks/useMerchant';
import Link from 'next/link';
import { useState } from 'react';
import MerchantInfo from './components/register-form';
import RegisterOverView from './components/register-overview';

const MerchantRegisterPage = () => {
  const [error, setError] = useState<any>({});
  const [showFormNo, setShowFormNo] = useState(1);
  const [data, setData] = useState<any>({
    location: '',
    store_name: '',
    phone_no: '',
    proprietor: '',
    correctInfoCheck: false,
  });
  const { registerMerchant, isProcessing } = useMerchant({ data: { ...data } });

  const handleChange = (e: any) => {
    delete error[e.target.name];
    if(e.target.name === 'correctInfoCheck') {
      setData({ ...data, [e.target.name]: !data.correctInfoCheck });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  console.log(data, ':data')

  const validation = () => {
    const err: any = {};
    if (!data.store_name) err.store_name = 'Enter Store Name';
    if (!data.proprietor) err.proprietor = 'Enter Store Owner Name';
    if (!data.phone_no) err.phone_no = 'Enter Phone Number';
    if (!data.location) err.location = 'Enter Store Address';
    return err;
  };

  const handleSubmit = () => {
    try {
      const errorChecked = validation();
      setError(errorChecked);
      if (Object.keys(errorChecked).length === 0) {
        // if (showFormNo === 1) {
        //   setShowFormNo(2);
        // } else {
          console.log('manish');

          registerMerchant();

          // setShowFormNo(3)
        // }
      }
    } catch (error) {
      console.log(error)
      setShowFormNo(1);
    }
    
  };
  return (
    <section className="relative">
      <div className="container mx-auto">
        <div className="mb-6 flex items-center pt-10">
          <Link
            href={showFormNo === 1 ? '/' : '#'}
            onClick={() => ((showFormNo === 2 || showFormNo === 3) && setShowFormNo(1)) || false}
          >
            <ChevronLeftIcon width={24} height={24} />
          </Link>
        </div>
        {showFormNo === 1 && (
          <MerchantInfo
            data={data}
            title="Apply to become a merchant"
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loader={isProcessing}
          />
        // ) : (
        //   <RegisterOverView data={data} loader={isProcessing} handleSubmit={handleSubmit} />
        )}
        {showFormNo ===  2 && (
          <RegisterOverView data={data} loader={isProcessing} handleSubmit={handleSubmit} />
        )}


        {showFormNo === 3 && (
          <ConfirmationScreen text='Thank you for applying! The Local Coin team will review your application and get back to you within 1 week. If you have any questions, please email admin@localcoin.us' />
        )}
      </div>
      {/* <BridgeBG /> */}
    </section>
  );
};

export default MerchantRegisterPage;

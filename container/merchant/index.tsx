'use client';

import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useWallet } from '@suiet/wallet-kit';
import { ConfirmationScreen } from 'components/confirmationScreen';
import { useMyContext } from 'hooks/useMyContext';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { MERCHANT_REGISTRY, PACKAGE_ID } from 'utils/constants';
import MerchantInfo from './components/register-form';

const MerchantRegisterPage = () => {
  const [error, setError] = useState<any>({});
  const [showFormNo, setShowFormNo] = useState(1);
  const { userInfo } = useMyContext();
  const [data, setData] = useState<any>({
    location: '',
    store_name: '',
    phone_no: '',
    proprietor: '',
    correctInfoCheck: false,
  });

  const { signAndExecuteTransactionBlock } = useWallet()

  const [showLoader, setShowLoader] = useState(false);

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

  const registerMerchant = async () => {
    try {
      const pkId = PACKAGE_ID
      const tx = new TransactionBlock()
      tx.moveCall({
        target: `${pkId}::registry::merchant_registration`,
        arguments: [
          tx.pure.string(data.proprietor),
          tx.pure.string(data.phone_no),
          tx.pure.string(data.store_name),
          tx.pure.string(data.location),

          tx.object(MERCHANT_REGISTRY)

          
        ],
      })

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx
      })
      console.log(result, ':result')
      if(!result?.digest) {
        throw new Error ('Failed registering merchant')
      }
      return result

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const handleSubmit = async () => {
    try {
      
      const errorChecked = validation();
      setError(errorChecked);
      if (Object.keys(errorChecked).length === 0) {
          setShowLoader(true)
          const resp = await registerMerchant()
          if(resp?.digest) {
            setShowLoader(false);
            console.log(resp);
            toast.success('Merchant Registration Successfull');
            setShowLoader(false);
            setShowFormNo(3);
          } else {
            throw new Error('Failed Registering Merchant')
          }
          
      }
      setShowLoader(false);
    } catch (error: any) {
      console.log(error)
      toast.error('Failed while applying for merchant')
      setShowFormNo(1);
      setShowLoader(false);
    }
    
  };

  return (
    <section className="relative">
      <div className="container mx-auto">
        {showFormNo === 1 && (
          <>
            <div className="mb-[18px] flex items-center pt-10">
              <Link
                href={showFormNo === 1 ? '/' : '#'}
                className='flex items-center gap-[6px]'
              >
                <ChevronLeftIcon width={16} height={16} />
                <span className='text-[12px] font-normal'>Back</span>
               
              </Link>
            </div>
            <MerchantInfo
              data={data}
              title="Apply to become a merchant"
              error={error}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loader={showLoader}
            />
            </>
        // ) : (
        //   <RegisterOverView data={data} loader={isProcessing} handleSubmit={handleSubmit} />
        )}
        {/* {showFormNo ===  2 && (
          <RegisterOverView data={data} loader={showLoader} handleSubmit={handleSubmit} />
        )} */}


        {showFormNo === 3 && (
          <ConfirmationScreen type='merchant' />
        )}
      </div>
      {/* <BridgeBG /> */}
    </section>
  );
};

export default MerchantRegisterPage;

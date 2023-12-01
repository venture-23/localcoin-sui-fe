/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Header from 'components/layout/header';
import useHandleCopy from 'hooks/useCopyText';
import { useMyContext } from 'hooks/useMyContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { encodeToken } from 'services/encrypt-decrypt-data';
import generateKeyPair from 'services/generateKeypair';
import { maskWalletAddress } from 'utils/clipper';
import GenerateKeyPair from './components/generate-key-pair-page';
import MerchantInfo from './components/user-info';
import { ClipboardIcon } from '@heroicons/react/24/outline';

interface ErrorType {
  storeName?: string;
  proprietaryName?: string;
  phoneNumber?: string;
  secretKey?: string;
}

const MerchantSignup = ({ param }) => {
  const [showScreen, setShowScreen] = useState(0);
  const { setshowPinScreen, userEnterPin } = useMyContext();
  const [data, setData] = useState<any>({
    storeName: '',
    proprietaryName: '',
    phoneNumber: ''
  });

  const router = useRouter();

  useEffect(() => {
    if (userEnterPin) {
      const resp = encodeToken({ ...data, userType: param }, userEnterPin);
      console.log('first', resp);
      if (resp) {
        localStorage.setItem('local-coin', resp);
        router.push(`/${param}`);
        // console.log({ data }, params.get('type'), params);
      }
    }
  }, [userEnterPin]);

  const [error, setError] = useState<ErrorType>({});
  const [isCopied, handleCopy] = useHandleCopy({ showToast: true });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e;
    delete error[name];
    setData({ ...data, [name]: value });
  };
  const validation = () => {
    const err: any = {};
    if (!data.storeName) err.storeName = 'Enter Store Name';
    if (!data.proprietaryName) err.proprietaryName = 'Enter Proprietary Name';
    if (!data.phoneNumber) err.phoneNumber = 'Enter Phone Number';
    return err;
  };
  const handleSubmit = () => {
    const errorChecked = validation();
    setError(errorChecked);
    if (Object.keys(errorChecked).length === 0) {
      console.log('good to go', data);
      // router.push('/generate-key-pair');
      setShowScreen(1);
    }
  };

  const handleGenerateKey = () => {
    const resp = generateKeyPair();
    if (resp.secretKey) {
      setData({ ...data, ...resp });
      // setshowPinScreen(true);
    }
  };

  return (
    <>
      <Header className="h-[120px]">
        <div className="flex items-center">
          {showScreen === 0 ? (
            <Link href={showScreen === 0 ? '/signup' : ''}>{'<- '}</Link>
          ) : (
            <div onClick={() => setShowScreen(showScreen - 1)}> {'<- '}</div>
          )}

          <p className="flex-1  text-center text-2xl font-semibold">LocalCoin</p>
        </div>
      </Header>
      <section className="my-6">
        {showScreen === 0 ? (
          <MerchantInfo
            data={data}
            title={param?.charAt(0).toUpperCase() + param?.slice(1)}
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          (!data.secretKey && <GenerateKeyPair handleGenerateKey={handleGenerateKey} />) || null
        )}
      </section>
      {data.secretKey && (
        <div className="container mx-auto rounded-md bg-white p-4">
          <p className="mb-4 text-slate-600">Please securely copy this code</p>
          <div className="grid gap-3">
            <div className="flex justify-between">
              <span className="font-bold">Public Key :</span>
              <span className="text-sm">{maskWalletAddress(data.publicKey)}</span>{' '}
              <button onClick={handleCopy}>
                <ClipboardIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Secret Key :</span>{' '}
              <span className="text-sm">{maskWalletAddress(data.secretKey)}</span>{' '}
              <button disabled={isCopied} onClick={handleCopy}>
                <ClipboardIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto">
        <div className="mt-6">
          {data.secretKey && (
            <button
              type="button"
              onClick={() => setshowPinScreen(true)}
              className=" button-primary  w-full "
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MerchantSignup;

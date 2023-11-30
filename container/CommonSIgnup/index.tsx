'use client';

import Header from 'components/layout/header';
import useHandleCopy from 'hooks/useCopyText';
import { useMyContext } from 'hooks/useMyContext';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import generateKeyPair from 'services/generateKeypair';
import { maskWalletAddress } from 'utils/clipper';
import GenerateKeyPair from './components/generate-key-pair-page';
import MerchantInfo from './components/user-info';

interface ErrorType {
  storeName?: string;
  proprietaryName?: string;
  phoneNumber?: string;
}

const MerchantSignup = () => {
  const [showScreen, setShowScreen] = useState(0);
  const { setshowPinScreen } = useMyContext();
  const [data, setData] = useState({
    storeName: '',
    proprietaryName: '',
    phoneNumber: ''
  });

  const params = useSearchParams();

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
      console.log('good to go');
      // router.push('/generate-key-pair');
      setShowScreen(1);
    }
  };

  const handleGenerateKey = () => {
    const resp = generateKeyPair();
    if (resp.secretKey) {
      setData({ ...data, ...resp });
      setshowPinScreen(true);
    }
  };

  return (
    <>
      <Header className="h-[120px]">
        <div className="flex items-center">
          {showScreen === 0 ? (
            <Link href={showScreen === 0 ? 'signup' : ''}>{'<- '}</Link>
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
            title={params.get('type') || ''}
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <GenerateKeyPair handleGenerateKey={handleGenerateKey} />
        )}
      </section>
      {data.secretKey && (
        <>
          <div>
            Public Key : {maskWalletAddress(data.publicKey)}{' '}
            <button onClick={handleCopy}>copy</button>
          </div>
          <div>
            Secret Key : {maskWalletAddress(data.secretKey)}{' '}
            <button disabled={isCopied} onClick={handleCopy}>
              Copy
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default MerchantSignup;

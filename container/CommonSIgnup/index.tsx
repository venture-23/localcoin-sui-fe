/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import useHandleCopy from 'hooks/useCopyText';
import { useMyContext } from 'hooks/useMyContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
import { useState } from 'react';
import generateKeyPair from 'services/generateKeypair';
import { maskWalletAddress } from 'utils/clipper';
import GenerateKeyPair from './components/generate-key-pair-page';
import MerchantInfo from './components/user-info';
import Image from 'next/image';

interface ErrorType {
  storeName?: string;
  proprietaryName?: string;
  phoneNumber?: string;
  secretKey?: string;
}

const MerchantSignup = ({ param }: any) => {
  const router = useRouter();
  const [showSpinner, seShowSpinner] = useState(false);
  const [showScreen, setShowScreen] = useState(param === 'merchant' ? 0 : 1);
  const { setshowPinScreen, userEnterPin, userInfo, setUserInfo } = useMyContext();
  const [data, setData] = useState<any>({
    storeName: '',
    proprietaryName: '',
    phoneNumber: ''
  });

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

  const handleGenerateKey = async () => {
    seShowSpinner(true);
    const resp = await generateKeyPair();
    console.log({ resp });
    if (resp.secretKey) {
      seShowSpinner(false);
      setData({ ...data, ...resp });
      // setshowPinScreen(true);
    }
  };

  const handleSignUp = () => {
    setUserInfo({ ...data, userType: param });
    setshowPinScreen(true);
  };
  return (
    <>
      {/* <Header className="h-[120px]"> */}
      {/* </Header> */}
      <section className="">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center pt-10">
            {param === 'merchant' ? (
              showScreen === 0 ? (
                <Link href={showScreen === 0 ? '/signup' : ''}>{'<- '}</Link>
              ) : (
                <div onClick={() => setShowScreen(0)}> {'<- '}</div>
              )
            ) : (
              <Link href={'/signup'}>{'<- '}</Link>
            )}
            {/* <p className="flex-1 text-2xl font-semibold text-center">LocalCoin</p> */}
          </div>
          {showSpinner && (
            <>
              <div className="fixed inset-0 mx-auto flex flex-col items-center justify-center bg-white">
                <div>
                  <Image src={'/generateQR.gif'} width={250} height={250} />
                </div>
                <p className="my-4 text-2xl ">Generating key for you</p>
              </div>
            </>
          )}
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
          {data.secretKey && (
            <div className="rounded-md bg-white p-6">
              <p className="mb-4 text-lg font-bold text-text">Please securely copy this code</p>
              <div className="grid gap-3">
                <div className="relative flex flex-col gap-1 rounded-[4px] bg-bgGray  p-4 ">
                  <div>
                    <p className="mb-2 font-medium">Public Key :</p>
                    <p className="text-sm text-textSecondary">
                      {maskWalletAddress(data.publicKey)}
                    </p>{' '}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="absolute top-1/2 -translate-y-1/2 self-end rounded-full bg-primary p-2 text-white"
                  >
                    <ClipboardIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="relative flex flex-col gap-1 rounded-[4px] bg-bgGray  p-4 ">
                  <div>
                    <p className="mb-2 font-medium">Secret Key :</p>
                    <p className="text-sm text-textSecondary">
                      {maskWalletAddress(data.secretKey)}
                    </p>{' '}
                  </div>
                  <button
                    disabled={isCopied}
                    onClick={handleCopy}
                    className="absolute top-1/2 -translate-y-1/2 self-end rounded-full bg-primary p-2 text-white"
                  >
                    <ClipboardIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                {data.secretKey && (
                  <div onClick={() => handleSignUp()}>
                    <Button text="Complete" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MerchantSignup;

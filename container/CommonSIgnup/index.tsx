/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import useHandleCopy from 'hooks/useCopyText';
import { useMyContext } from 'hooks/useMyContext';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useAddToHomescreenPrompt } from 'components/addToHomeScreen';
import BridgeBG from 'components/bridgebg';
import { ConfirmationScreen } from 'components/confirmationScreen';
import { useMerchant } from 'hooks/useMerchant';
import { useState } from 'react';
import generateKeyPair from 'services/generateKeypair';
import MerchantInfo from './components/user-info';

interface ErrorType {
  storeName?: string;
  proprietaryName?: string;
  phoneNumber?: string;
  secretKey?: string;
}

const MerchantSignup = ({ param }: any) => {
  const router = useRouter();
  console.log(router);
  const [merchantFlag, setMerchantFlag] = useState(false);
  const [data, setData] = useState<any>({
    storeName: '',
    proprietaryName: '',
    phoneNumber: '',
    location: '',
    correctInfoCheck: false
  });

  const { registerMerchant, isProcessing } = useMerchant({ merchantFlag, data: { ...data } });

  const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();

  const [showSpinner, seShowSpinner] = useState(false);
  const [showScreen, setShowScreen] = useState(param === 'merchant' ? 0 : 1);
  const { setshowPinScreen, userEnterPin, userInfo, setUserInfo } = useMyContext();
  const [successScreen, setSuccessScreen] = useState(false);

  console.log(isProcessing, ':process');

  const [error, setError] = useState<ErrorType>({});
  const [isCopied, handleCopy] = useHandleCopy({ showToast: true });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e;
    delete error[name];
    if (name === 'correctInfoCheck') {
      setData({ ...data, [name]: !data.correctInfoCheck });
    } else {
      setData({ ...data, [name]: value });
    }
  };
  const validation = () => {
    const err: any = {};
    if (!data.storeName) err.storeName = 'Enter Store Name';
    if (!data.proprietaryName) err.proprietaryName = 'Enter Proprietary Name';
    if (!data.phoneNumber) err.phoneNumber = 'Enter Phone Number';
    if (!data.location) err.location = 'Enter Location';
    return err;
  };
  const handleSubmit = () => {
    const errorChecked = validation();
    setError(errorChecked);
    if (Object.keys(errorChecked).length === 0) {
      console.log('good to go', data);
      // router.push('/generate-key-pair');
      // setShowScreen(1);
      setMerchantFlag(true);

      registerMerchant();
      // if (isProcessing)
      // setSuccessScreen(true)
    }
  };

  const handleGenerateKey = async () => {
    seShowSpinner(true);
    const resp = await generateKeyPair();
    console.log({ resp });
    if (resp.secretKey) {
      seShowSpinner(false);
      setData({ ...data, ...resp });
      // setShowPinScreen(true);
    }
  };

  const handleSignUp = () => {
    setUserInfo({ ...data, userType: param });
    setShowPinScreen(true);
  };
  return (
    <>
      {/* <Header className="h-[120px]"> */}
      {/* </Header> */}
      <section className="relative">
        <div className="container mx-auto">
          {/* <div className="mb-6 flex items-center pt-10"> */}
          {/* <PageHeader backLink={'/'} /> */}
          {/* {promptable && !isInstalled ? (
              <buton onClick={promptToInstall}>INSTALL APP</buton>
            ) : null} */}
          {/* {param === 'merchant' ? (
              showScreen === 0 ? (
                <Link href={showScreen === 0 ? '/signup' : ''}>
                  <ChevronLeftIcon width={24} height={24} />
                </Link>
              ) : (
                <div onClick={() => setShowScreen(0)}>
                  {' '}
                  <ChevronLeftIcon width={24} height={24} />
                </div>
              )
            ) : (
              <Link href={'/signup'}>
                <ChevronLeftIcon width={24} height={24} />
              </Link>
            )} */}
          {/* <p className="flex-1 text-2xl font-semibold text-center">LocalCoin</p> */}
          {/* </div> */}
          {/* {showSpinner && (
            <>
              <div className="fixed inset-0 mx-auto flex flex-col items-center justify-center bg-white">
                <div>
                  <Image src={'/generateQR.gif'} width={250} height={250} alt='' />
                </div>
                <p className="my-4 text-2xl ">Creating your digital account</p>
              </div>
            </>
          )} */}
          {successScreen ? (
            <ConfirmationScreen type="merchant" />
          ) : (
            <>
              <div onClick={() => router.back()} className="flex cursor-pointer items-center">
                <ChevronLeftIcon width={16} height={16} />
                <span className="text-[12px] font-normal">Back</span>
              </div>

              <MerchantInfo
                data={data}
                title={param?.charAt(0).toUpperCase() + param?.slice(1)}
                error={error}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </>
          )}

          {/* {showScreen === 0 ? (
            <MerchantInfo
              data={data}
              title={param?.charAt(0).toUpperCase() + param?.slice(1)}
              error={error}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            (!data.secretKey && <GenerateKeyPair handleGenerateKey={handleGenerateKey} />) || null
          )} */}
          {/* {data.secretKey && (
            <div className="rounded-md bg-white p-10">
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
                    onClick={() => handleCopy(data.publicKey)}
                    className="absolute top-1/2 -translate-y-1/2 self-end rounded-full bg-primary p-2 text-white"
                  >
                    {isCopied ? '' : <ClipboardIcon className="h-6 w-6" />}
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
                    onClick={() => handleCopy(data.secretKey)}
                    className="absolute top-1/2 -translate-y-1/2 self-end rounded-full bg-primary p-2 text-white"
                  >
                    {isCopied ? '' : <ClipboardIcon className="h-6 w-6" />}
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
          )} */}
        </div>
        <BridgeBG />
      </section>
    </>
  );
};

export default MerchantSignup;

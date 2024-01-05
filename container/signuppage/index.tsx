'use client';
import { ArrowDownOnSquareStackIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { useAddToHomescreenPrompt } from 'components/test';
import { useEffect, useRef, useState } from 'react';
// import Header from 'components/layout/header';
import Image from 'next/image';

import Button from 'components/botton';
import BridgeBG from 'components/bridgebg';
import PinLockScreen from 'components/pin-lock-screen';
import GenerateKeyPairPage from 'container/CommonSIgnup/components/generate-key-pair-page';
import useHandleCopy from 'hooks/useCopyText';
import { useMyContext } from 'hooks/useMyContext';
import { useRouter } from 'next/navigation';
import { encodeToken } from 'services/encrypt-decrypt-data';
import generateKeyPair from 'services/generateKeypair';
import { maskWalletAddress } from 'utils/clipper';

const SignupPage = () => {
  const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();
  const popOverRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    popOverRef && showPopup();
  }, [promptable]);

  const showPopup = () => {
    // setOpen(false);
    // setIsOpenPopup(true);
    popOverRef?.current?.open({
      title: '',
      messageTitle: 'Install LocalCoin',
      message: 'Add to your homescreen',
      // type: 'success'
      downloadIcon: <ArrowDownOnSquareStackIcon width={48} height={48} />
    });
  };

  const [isCopied, handleCopy] = useHandleCopy({ showToast: true });

  const { userInfo, setUserInfo, setshowPinScreen } = useMyContext();
  const [showSpinner, seShowSpinner] = useState(false);
  const [data, setData] = useState<any>({
    storeName: '',
    proprietaryName: '',
    phoneNumber: '',
    location: ''
  });

  const handleGenerateKey = async () => {
    seShowSpinner(true);
    const resp: any = await generateKeyPair();
    console.log({ resp });
    if (resp.secretKey) {
      localStorage.setItem('local-coin', encodeToken({ ...data, ...resp }, userInfo.enterPin));
      seShowSpinner(false);
      setData({ ...data, ...resp });
    }
  };
  const handleSignUp = () => {
    setUserInfo({ ...data });
    router.push('/');
  };
  return (
    <>
      {console.log({ userInfo })}
      <section className="bg-[#F7F8FA] ">
        <div className="container mx-auto ">
          {(!userInfo?.enterPin && <PinLockScreen />) ||
            (!data.secretKey && <GenerateKeyPairPage handleGenerateKey={handleGenerateKey} />) ||
            null}
          {showSpinner && (
            <>
              <div className="fixed inset-0 mx-auto flex flex-col items-center justify-center bg-white">
                <div>
                  <Image src={'/generateQR.gif'} width={250} height={250} />
                </div>
                <p className="my-4 text-2xl ">Creating your digital account</p>
              </div>
            </>
          )}
          {data.secretKey && (
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
                    {/* {isCopied ? '' : <ClipboardIcon className="h-6 w-6" />} */}
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
                    onClick={() => handleCopy(data.secretKey)}
                    className="absolute top-1/2 -translate-y-1/2 self-end rounded-full bg-primary p-2 text-white"
                  >
                    {/* {isCopied ? '' : <ClipboardIcon className="h-6 w-6" />} */}
                    <ClipboardIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                {data.secretKey && (
                  <div onClick={() => handleSignUp()}>
                    <Button text="Start Earning" />
                  </div>
                )}
              </div>
            </div>
          )}
          {/* <div className="mb-10 pt-10 ">
            <h1 className=" text-heading">
              Signup <span className="font-normal">with your desired role.</span>{' '}
            </h1>
            {promptable && !isInstalled ? (
              <>
                <PopupBox ref={popOverRef}>
                  <a onClick={() => promptToInstall()} download className="w-full">
                    <Button text="Add" />
                  </a>
                </PopupBox>
              </>
            ) : null}
          </div>
          <div className="flex flex-col justify-between gap-24">
            <div className="grid gap-5">
              <Card
                title="Merchant"
                link="/signup/merchant"
                iconName={<BuildingStorefrontIcon className="h-8 w-8 text-primary" />}
              />
              <Card
                title="Recipient"
                link="/signup/recipient"
                iconName={<UserCircleIcon className="h-8 w-8 text-primary" />}
              />
              <Card
                title="Campaign Creator"
                link="/signup/campaign"
                iconName={<GlobeEuropeAfricaIcon className="h-8 w-8 text-primary" />}
              />
            </div>
          </div> */}
        </div>
        <BridgeBG />
      </section>
    </>
  );
};

export default SignupPage;

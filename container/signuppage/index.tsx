'use client';
import {
  ArrowDownOnSquareStackIcon,
  ChevronLeftIcon,
  ClipboardIcon
} from '@heroicons/react/24/outline';
import { useAddToHomescreenPrompt } from 'components/test';
import { useEffect, useRef, useState } from 'react';
// import Header from 'components/layout/header';
import Image from 'next/image';

import { setCookieData } from 'app/action';
import Button from 'components/botton';
import BridgeBG from 'components/bridgebg';
import GenerateKeyPairPage from 'container/CommonSIgnup/components/generate-key-pair-page';
import useHandleCopy from 'hooks/useCopyText';
import { useMyContext } from 'hooks/useMyContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { encodeToken } from 'services/encrypt-decrypt-data';
import generateKeyPair from 'services/generateKeypair';
import { maskWalletAddress } from 'utils/clipper';

const SignupPage = () => {
  const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();
  const { userInfo, setUserInfo, setShowPinScreen } = useMyContext();

  const popOverRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    setShowPinScreen(true);
  }, []);

  useEffect(() => {
    popOverRef && showPopup();
  }, [promptable]);

  const showPopup = () => {
    popOverRef?.current?.open({
      title: '',
      messageTitle: 'Install LocalCoin',
      message: 'Add to your homescreen',
      // type: 'success'
      downloadIcon: <ArrowDownOnSquareStackIcon width={48} height={48} />
    });
  };

  const [isCopied, handleCopy] = useHandleCopy({ showToast: true });

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
      const encodedData = encodeToken({ ...data, ...resp }, userInfo.enterPin);
      await setCookieData(encodedData);
      setUserInfo({ ...userInfo, enterPin: '' });
      localStorage.setItem('local-coin', encodedData);
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
      <section className="bg-[#F7F8FA] ">
        <div className="container mx-auto ">
          {userInfo?.enterPin && (
            <div className="mb-6 flex items-center pt-10">
              <Link href={'/'}>
                <ChevronLeftIcon width={24} height={24} />
              </Link>
            </div>
          )}
          {(!data.secretKey && <GenerateKeyPairPage handleGenerateKey={handleGenerateKey} />) ||
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

'use client';
import {
  ArrowDownOnSquareStackIcon
} from '@heroicons/react/24/outline';
import { useAddToHomescreenPrompt } from 'components/addToHomeScreen';
import { useEffect, useRef, useState } from 'react';
// import Header from 'components/layout/header';
import Image from 'next/image';

import { useWallet } from '@suiet/wallet-kit';
import { setCookieData } from 'app/action';
import GenerateKeyPairPage from 'container/CommonSIgnup/components/generate-key-pair-page';
import useHandleCopy from 'hooks/useCopyText';
import { useMyContext } from 'hooks/useMyContext';
import { useRouter } from 'next/navigation';
import { encodeToken } from 'services/encrypt-decrypt-data';
import SignUpSuccess from './SignupSuccessScreen';

const SignupPage = () => {
  const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();
  const { userInfo, setUserInfo, setShowPinScreen } = useMyContext();

  const popOverRef = useRef<any>(null);
  const router = useRouter();
  const { connected, address } = useWallet()

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
    // const resp: any = await generateKeyPair();
    const resp: any = {
      publicKey: address,
      secretKey: address
    }
    console.log({ resp });
    if (resp.secretKey) {
      const encodedData = encodeToken({ ...data, ...resp }, userInfo.enterPin);
      await setCookieData(encodedData);
      setUserInfo({ ...userInfo, enterPin: '' });
      localStorage.setItem('local-coin', encodedData);
      setData({ ...data, ...resp });
      setUserInfo({ ...data, ...resp });
    }
  };
  const handleSignUp = () => {
    console.log('handled')
    setUserInfo({ ...data });
    router.push("/");
  };


  useEffect(() => {
    if(connected) {
      handleGenerateKey()
    }
  }, [connected])

  return (
    <>
      <section className="">
        <div className="">
          {/* {userInfo?.enterPin && (
            <div className="container mb-6 flex items-center pt-10">
              <Link href={'/'}>
                <ChevronLeftIcon width={24} height={24} />
              </Link>
            </div>
          )} */}
          {(!data.secretKey && <GenerateKeyPairPage handleGenerateKey={handleGenerateKey} />) ||
            null}

          {showSpinner && (
            <>
              <div className="fixed inset-0 mx-auto flex flex-col items-center justify-center bg-white">
                <div>
                  <Image src={'/generateQR.gif'} alt='zz' width={250} height={250} />
                </div>
                <p className="my-4 text-2xl ">Creating your digital account</p>
              </div>
            </>
          )}
          {data.secretKey && (
            <SignUpSuccess handleSignUp={handleSignUp} publicKey={data.publicKey} secretKey={data.secretKey} />
          )}
          
        </div>
        {/* <BridgeBG /> */}
      </section>
    </>
  );
};

export default SignupPage;

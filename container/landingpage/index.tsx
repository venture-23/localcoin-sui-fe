'use client';
import { ArrowDownOnSquareStackIcon } from '@heroicons/react/24/outline';
import { useAddToHomescreenPrompt } from 'components/addToHomeScreen';
import Button from 'components/botton';
import { Campaigns } from 'components/campaigns';
import { PageFooter } from 'components/pageFooter';
import PageHeader from 'components/pageheader';
import PopupBox from 'components/popover';
import { Stores } from 'components/stores';
import { useGetBalance } from 'hooks';
import { useMyContext } from 'hooks/useMyContext';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { campaignServices } from 'services/campaign-services';
// import { useMyContext } from 'hooks/useMyContext';
// import { useRouter } from 'next/navigation';

import { encodeToken } from 'services/encrypt-decrypt-data';
const LandingPage = () => {
  const [promptable, promptToInstall, isInstalled] = useAddToHomescreenPrompt();
  const popOverRef = useRef<any>(null);

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
  const { userInfo } = useMyContext();
  const { userBalance, userUsdcBalance } = useGetBalance();
  const [isVerifiedMerchant, setIsVerifiedMerchant] = useState(false);

  const campInfo = {
    publicKey: 'GC35FMQWTX7HA2UGRRHLEVT46CEKZBSDDXQXADEZGWWWOZCGCUZOOPE4',
    secretKey: 'SBQD2MZPMRDLDIYE3SPXUD5G5X5IBPI5L7SGV476SHLVHTIJJIRJ3MVN',
    userType: 'campaign'
  };
  const merInfo = {
    publicKey: 'GA443P5NB7YKQW3Q7U7NDUJLFO7HVMQH3FWK7PTR3IUMZAN5JG6UUHL5',
    secretKey: 'SCKKS3FLNGIOXICRNSFVNPBUNZLUA5EMEQESQS2IGLVYYYJAHRQX2GSA',
    userType: 'merchant',
    proprietaryName: 'Property Of Om',
    phoneNumber: '9860105561',
    storeName: 'Om Store Name',
    location: 'pokhara'
  };
  const recInfo = {
    publicKey: 'GAJEZJRT7AG4HK5OFFW7K7SZWU4GMT2JYIKIVE23PDLMQONPOLWUAZ2Q',
    secretKey: 'SDD7WD742RDSCUFKYI2BV77AQSU5FQ2C4ZMUMOTFKJRCPTBGTMBT7GZS',
    userType: 'recipient'
  };
  const handleClick = (name: string) => {
    const mapValue: any = {
      c: campInfo,
      m: merInfo,
      r: recInfo
    };
    localStorage.setItem('local-coin', encodeToken(mapValue[name], '1111'));
    window.location.reload();
  };

  useEffect(() => {
    if (userInfo?.publicKey) {
      campaignServices.get_verified_merchants(userInfo?.publicKey).then((response) => {
        if (response.length > 0) {
          console.log(response.includes(userInfo?.publicKey), ':veri');
          setIsVerifiedMerchant(response.includes(userInfo?.publicKey));
        }
      });
    }

  }, [userInfo])

  console.log(userUsdcBalance, 'usdc')

  

  return (
    <>
      {/* <div className='header-container'>
      <PageHeader />
    </div> */}
      <section className="">
        <div className='mb-[24px] landing-top'>
              <PageHeader isVerifiedMerchant={isVerifiedMerchant} />
              {(Number(userUsdcBalance) !== 0 && userUsdcBalance !== undefined) && (
                <div className='mb-[4px]'>
                  <h6 className='text-sm font-semibold text-[#1384F5]'>USDC Coins</h6>
                  <div className='text-[16px] font-semibold'>
                    {userUsdcBalance ? Number(userUsdcBalance).toFixed(0).toString() : 0}
                  </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <div>
              <h6 className="text-base font-bold text-[#1384F5]">Total LocalCoins</h6>
              <div className="text-[32px] font-semibold leading-9">
                {userBalance ? Number(userBalance).toFixed(0).toString() : 0}
              </div>
            </div>
            {isVerifiedMerchant && (
              <div className="self-end">
                <Link href={'/withdraw'}>
                  <button className="cursor-pointer rounded-[6px] bg-[#1653AE] px-[18px] py-[5px] text-[12px] font-medium text-[#FFf]">
                    Withdraw
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="container mx-auto ">
          {/* Dashboard */}

          {/* Stores */}
          <Stores />

          {/* Campaigns */}
          <Campaigns />

          {/* <div className="flex justify-center ">
          <GetStartedSVG />
        </div> */}
          {/* <div className="mb-6 mt-4 text-center">
          <h2 className="text-heading mb-0 ">Get Started</h2>
          <p className="text-color text-lg opacity-[.6]">
            LocalCoin is just around the corner.
            <span
              onClick={() => {
                handleClick('c');
              }}
            >
              Choose
            </span>{' '}
            <span
              onClick={() => {
                handleClick('m');
              }}
            >
              an&nbsp;
            </span>
            <span
              onClick={() => {
                handleClick('r');
              }}
            >
              option&nbsp;
            </span>
            below to get started .
          </p>
        </div> */}

          {/* <div className="flex flex-col gap-5 ">
          <Button text="Sign up for account" link="/signup" />
          <Button
            text="Check for ongoing campaigns"
            buttonIcon={<QrCodeIcon className="text-color h-5 w-5" />}
            buttonType="secondary"
            link="/all-campaigns"
          />

          <Button
            text="Sign up for account"
            link="/signup"
            underline={`underline bg-transparent !text-[#212B34]  font-semibold `}
          />
        </div> */}
          {promptable && !isInstalled ? (
            <>
              <PopupBox ref={popOverRef}>
                <a onClick={() => promptToInstall()} download className="w-full">
                  <Button text="Add" />
                </a>
              </PopupBox>
            </>
          ) : null}
          <PageFooter />
        </div>
      </section>
    </>
  );
};

export default LandingPage;

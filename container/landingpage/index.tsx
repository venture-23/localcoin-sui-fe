'use client';
import { ArrowDownOnSquareStackIcon } from '@heroicons/react/24/outline';
import { useAddToHomescreenPrompt } from 'components/addToHomeScreen';
import Button from 'components/botton';
import { Campaigns } from 'components/campaigns';
import { PageFooter } from 'components/pageFooter';
import PageHeader from 'components/pageheader';
import PopupBox from 'components/popover';
import { Stores } from 'components/stores';
import { LoginScreen } from 'container/LoginScreen';
import { useCamapigns, useGetBalance, useLogin } from 'hooks';
import { useMyContext } from 'hooks/useMyContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
// import { useMyContext } from 'hooks/useMyContext';
// import { useRouter } from 'next/navigation';

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
  const { userBalance, userUsdcBalance, isFetchingUsdcBalance, isFetchingUserBalance } = useGetBalance();
  const [isVerifiedMerchant, setIsVerifiedMerchant] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);
  const [isCampaignCreator, setIsCampaignCreator] = useState<boolean>(false);
  const { userDetails, isLoggedIn,isGoogleScreenLoading, login } = useLogin()
  const router = useRouter()

  const { merchantList } = useCamapigns({ fetchAllCampaign: true});
  const { campaignList } = useCamapigns({ fetchAllCampaign: true });
  console.log(campaignList, ':campaignListLanding')
  

  useEffect(() => {
    if (userDetails?.address) {
      const verifiedMer = merchantList?.find(item => ((item?.merchant_address === userDetails?.address)))
      const isCreator = campaignList?.some(item => item.creator === userDetails.address)
      console.log(verifiedMer, ':veriy')
      setIsMerchant(Boolean(verifiedMer))
      setIsVerifiedMerchant(Boolean(verifiedMer?.verification_status))
      setIsCampaignCreator(Boolean(isCreator))
    }
  }, [userDetails?.address, merchantList, campaignList]);

  console.log(userUsdcBalance, 'usdc');

  useEffect(() => {
    if(typeof window !== 'undefined') {
      const paymentUrl = localStorage.getItem('paymentUrl') || ''
      if(paymentUrl) {
        router.push(`/payment${paymentUrl}`)
      }
    }
    
  }, [])


  return (
    <>
      {isLoggedIn || userDetails?.address ? (
        <section className="">
        <div className="landing-top mb-[8px]">
          <PageHeader isCampaignCreator={isCampaignCreator} isMerchant={isMerchant} isVerifiedMerchant={isVerifiedMerchant} />
          {Number(userUsdcBalance) !== 0 && userUsdcBalance !== undefined && !Number.isNaN(userUsdcBalance) && (
            <div className="mb-[4px]">
              <h6 className="text-sm font-semibold text-[#1384F5]">USDC Coins</h6>
              <div className="text-[16px] font-semibold">
                {isFetchingUsdcBalance ? (
                  <ThreeDots 
                    visible={true}
                    height="20"
                    width="20"
                    color="#000"
                    radius="15"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (userUsdcBalance ?? 0)}
                
              </div>
            </div>
          )}

          <div className="flex justify-between">
            {userDetails?.address &&  (
              <div>
                <h6 className="text-base font-bold text-[#1384F5]">Total LocalCoins</h6>
                <div className="text-[32px] font-semibold leading-9">
                {isFetchingUsdcBalance ? (
                    <ThreeDots 
                      visible={true}
                      height="30"
                      width="30"
                      color="#000"
                      radius="25"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (userBalance ?? 0)} 
                </div>
              </div>
            )}
            
            {userDetails?.address && isVerifiedMerchant && (
              <div className="self-end">
                <Link href={'/withdraw'}>
                  <button className="cursor-pointer rounded-[6px] bg-[#1653AE] px-[18px] py-[5px] text-[12px] font-medium text-[#FFf]">
                    Withdraw
                  </button>
                </Link>
              </div>
            )}
            {!isLoggedIn && (
              <div className='self-end'>
                <button disabled={isGoogleScreenLoading} onClick={login} className="flex items-center gap-[4px] cursor-pointer border border-[#1653AE] rounded-[6px] bg-[#fff] px-[18px] py-[5px] text-[12px] font-bold text-[#1653AE]">
                    <span>Sign in</span>
                    <img className='w-[20px]' src="https://img.icons8.com/color/48/google-logo.png" alt="" />
                    
                    <TailSpin
                      visible={isGoogleScreenLoading}
                      height="20"
                      width="20"
                      color="#1653AE"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                   
                </button>
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
      ) : (
        <LoginScreen />
      )}
      
    </>
  );
};

export default LandingPage;

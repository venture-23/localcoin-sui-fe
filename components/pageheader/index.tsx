import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useGetBalance } from 'hooks';
import { useMyContext } from 'hooks/useMyContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { campaignServices } from 'services/campaign-services';
import { maskWalletAddress } from 'utils/clipper';

interface PageHeaderProps {
  pageHeaderTitle?: any;
  backLink?: any;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageHeaderTitle, backLink }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const { userInfo } = useMyContext();
  const { userBalance } = useGetBalance()

  const [isVerifiedMerchant, setIsVerifiedMerchant] = useState(false);

  useEffect(() => {
    if(userInfo?.publicKey) {
      campaignServices.get_verified_merchants(userInfo?.publicKey).then(response => {

        if(response.length > 0 ) {
          console.log(response.includes(userInfo?.publicKey), ':veri')
          setIsVerifiedMerchant(response.includes(userInfo?.publicKey))
        }
      })
    }

  }, [userInfo])

   const handleCopy = () => {
    if(userInfo?.publicKey) {
      navigator.clipboard.writeText(userInfo?.publicKey)
      toast.info('Address copied')
    }
   }
  return (
    <>
      <div className="mb-[10px] flex w-full items-center justify-between pt-[10px]">
        {backLink && (
          <Link href={backLink}>
            <ChevronLeftIcon width={24} height={24} />
          </Link>
        )}

   
          <div className="">
            <h2 className="text-base font-medium">{pageHeaderTitle ? (
              <>
                Welcome back, <br />
                {pageHeaderTitle}
              </>
            ): (
              'Welcome'
            )}</h2>
          </div>
   
        
        
        <div onClick={() => setOpenMenu(prev => !prev)} className='w-[46px] h-[46px] flex-end ml-[auto] rounded-[100%] cursor-pointer'>
          <UserCircleIcon />
        </div>

        


        <div className={['mobile-menu pt-[10px]', openMenu && 'open'].join(' ')}>
          <div onClick={() => setOpenMenu(false)} className='cursor-pointer flex items-center'>
            <ChevronLeftIcon width={16} height={16} />
            <span className='text-[12px] font-normal'>Back</span>
          </div>
          <div className='flex flex-col h-[100%] justify-between'>
            <div className={['py-[10px] px-[16px] bg-[#EAEBEE] w-full', !userInfo?.publicKey && 'opacity-[0.3]'].join(' ')}>
              <div onClick={handleCopy} className='py-[4px] cursor-pointer px-[16px] bg-[#fff] text-lg font-normal'>
                {userInfo?.publicKey ? maskWalletAddress(userInfo?.publicKey) : 'Wallet Address'}
              </div>
              <p className='mt-[30px] font-semibold text-xs'>
                {userInfo?.publicKey ? `${userBalance ? Number(userBalance).toFixed(0).toString() : 0} Local Coin Tokens`: 'Earned coins today'}
              </p>
            </div>

            <div className='mx-[16px] my-[10px] flex flex-col gap-[19px]'>
              {userInfo.publicKey && isVerifiedMerchant ? '' : (
                <div className={['bg-[#EAEBEE] py-[10px] text-center text-lg font-semibold', !userInfo?.publicKey && 'opacity-[0.3]'].join(' ')}>
                  <Link className={`w-full block ${!userInfo?.publicKey && 'cursor-not-allowed'}`} href={userInfo?.publicKey ? '/merchant/register' : '/'}>
                    Apply to become a Merchant
                  </Link>
                </div>
              )}
              
              <div className={['bg-[#EAEBEE] py-[10px] text-center text-lg font-semibold', !userInfo?.publicKey && 'opacity-[0.3]'].join(' ')}>
                <Link className={`w-full block ${!userInfo?.publicKey && 'cursor-not-allowed'}`} href={userInfo?.publicKey ? '/campaign/create' : ''}>
                  Start a campaign
                </Link>
              </div>
              <div className={['bg-[#EAEBEE] py-[10px] text-center text-lg font-semibold'].join(' ')}>
                <Link className='w-full block' href={'/signup'}>
                  {userInfo?.publicKey ? (
                    <div className='flex items-center justify-center gap-[6px]'>
                    <Image 
                      src={'/MdLogout.svg'}
                      height={24}
                      width={24}
                      alt='Logout Icon'
                    />
                      Sign out
                    </div>
                  ) : 'Sign in'}
                </Link>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default PageHeader;

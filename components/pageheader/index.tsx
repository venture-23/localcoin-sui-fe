import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useGetBalance } from 'hooks';
import { useMyContext } from 'hooks/useMyContext';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { maskWalletAddress } from 'utils/clipper';

interface PageHeaderProps {
  pageHeaderTitle?: any;
  backLink?: any;
  isVerifiedMerchant?: boolean
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageHeaderTitle, backLink, isVerifiedMerchant }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const { userInfo } = useMyContext();
  const { userBalance } = useGetBalance()

  // const [isVerifiedMerchant, setIsVerifiedMerchant] = useState(false);

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
          <div onClick={() => setOpenMenu(false)} className='pl-[16px] cursor-pointer py-[12px] flex items-center'>
            <ChevronLeftIcon width={16} height={16} />
            <span className='text-[12px] font-normal'>Back</span>
          </div>
          <div className='flex flex-col h-[100%] justify-between'>
            <div className=' w-[calc(100%_+_2px)] rounded-[0px_0px_24px_24px] border-t-[0] border border-[#E4E4E7] bg-[#fff]'>
              <div className={[' w-full px-[16px]', !userInfo?.publicKey && 'opacity-[0.3]'].join(' ')}>
                <div onClick={handleCopy} className='py-[4px] cursor-pointer px-[16px] bg-[#fff] border border-[#E4E4E7] rounded-[6px] text-lg font-normal'>
                  {userInfo?.publicKey ? maskWalletAddress(userInfo?.publicKey) : 'Wallet Address'}
                </div>
                <p className='mt-[16px] font-semibold pb-[18px] text-base'>
                  {userInfo?.publicKey ? `${userBalance ? Number(userBalance).toFixed(0).toString() : 0} Local Coin Tokens`: 'Earned coins today'}
                </p>
              </div>
            </div>

            <div className='mx-[16px] my-[40px] flex flex-col gap-[19px]'>
              {userInfo.publicKey && isVerifiedMerchant ? '' : (
                <div className={['bg-[#FFF] py-[10px] text-center border border-[#171717] text-lg font-semibold', !userInfo?.publicKey && 'opacity-[0.3]'].join(' ')}>
                  <Link className={`w-full block ${!userInfo?.publicKey && 'cursor-not-allowed'}`} href={userInfo?.publicKey ? '/merchant/register' : '/'}>
                    Apply to become a Merchant
                  </Link>
                </div>
              )}
              
              <div className={['bg-[#FFF] py-[10px] text-center border border-[#171717] text-lg font-semibold', !userInfo?.publicKey && 'opacity-[0.3]'].join(' ')}>
                <Link className={`w-full block ${!userInfo?.publicKey && 'cursor-not-allowed'}`} href={userInfo?.publicKey ? '/campaign/create' : ''}>
                  Start a campaign
                </Link>
              </div>
              <div className={['bg-[#171717] py-[10px] border border-[#171717] text-white text-center text-lg font-semibold'].join(' ')}>
                <Link className='w-full block' href={'/signup'}>
                  {userInfo?.publicKey ? (
                    <div className='flex items-center justify-center gap-[6px]'>
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

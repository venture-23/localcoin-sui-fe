import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useMyContext } from 'hooks/useMyContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface PageHeaderProps {
  pageHeaderTitle?: any;
  backLink?: any;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageHeaderTitle, backLink }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const { userInfo } = useMyContext();
  return (
    <>
      <div className="mb-6 flex items-center justify-between pt-10">
        {backLink && (
          <Link href={backLink}>
            <ChevronLeftIcon width={24} height={24} />
          </Link>
        )}
        
        <div onClick={() => setOpenMenu(prev => !prev)} className='w-[46px] h-[46px] flex-end ml-[auto] rounded-[100%] bg-[#EAEBEE] cursor-pointer'>

        </div>

        {pageHeaderTitle && (
           <div className="">
              <h2 className="text-2xl font-bold ">{pageHeaderTitle}</h2>
            </div>
        )}


        <div className={['mobile-menu', openMenu && 'open'].join(' ')}>
          <div className='flex flex-col h-[100%] justify-between'>
            <div className={['py-[10px] px-[16px] bg-[#EAEBEE] w-full', !userInfo?.publicKey && 'opacity-[0.3]'].join(' ')}>
              <div className='py-[4px] px-[16px] bg-[#fff] text-lg font-normal'>
                {userInfo?.publicKey ? userInfo?.publicKey : 'Wallet Address'}
              </div>
              <p className='mt-[30px] font-semibold text-xs'>
                {userInfo?.publicKey ? '2400 Local Coin Tokens': 'Earned coins today'}
              </p>
            </div>

            <div className='mx-[16px] my-[10px] flex flex-col gap-[19px]'>
              <div className={['bg-[#EAEBEE] py-[10px] text-center text-lg font-semibold', !userInfo?.publicKey && 'opacity-[0.3]'].join(' ')}>
                <Link className='w-full block' href={''}>
                  Apply to become a Merchant
                </Link>
              </div>
              <div className={['bg-[#EAEBEE] py-[10px] text-center text-lg font-semibold', !userInfo?.publicKey && 'opacity-[0.3]'].join(' ')}>
                <Link className='w-full block' href={''}>
                  Start a campaign
                </Link>
              </div>
              <div className={['bg-[#EAEBEE] py-[10px] text-center text-lg font-semibold'].join(' ')}>
                <Link className='w-full block' href={''}>
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

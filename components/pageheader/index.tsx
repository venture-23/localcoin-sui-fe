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
  isVerifiedMerchant?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  pageHeaderTitle,
  backLink,
  isVerifiedMerchant
}) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { userInfo, setShowPinScreen } = useMyContext();
  const { userBalance } = useGetBalance();

  // const [isVerifiedMerchant, setIsVerifiedMerchant] = useState(false);

  const handleCopy = () => {
    if (userInfo?.publicKey) {
      navigator.clipboard.writeText(userInfo?.publicKey);
      toast.info('Address copied');
    }
  };
  return (
    <>
      <div className="mb-[10px] flex w-full items-center justify-between pt-[10px]">
        {backLink && (
          <Link href={backLink}>
            <ChevronLeftIcon width={24} height={24} />
          </Link>
        )}

        <div className="">
          <h2 className="text-base font-medium">
            {pageHeaderTitle ? (
              <>
                Welcome back, <br />
                {pageHeaderTitle}
              </>
            ) : (
              'Welcome'
            )}
          </h2>
        </div>

        <div
          onClick={() => setOpenMenu((prev) => !prev)}
          className="flex-end ml-[auto] h-[46px] w-[46px] cursor-pointer rounded-[100%]"
        >
          <UserCircleIcon />
        </div>

        <div className={['mobile-menu pt-[10px]', openMenu && 'open'].join(' ')}>
          <div
            onClick={() => setOpenMenu(false)}
            className="flex cursor-pointer items-center py-[12px] pl-[16px]"
          >
            <ChevronLeftIcon width={16} height={16} />
            <span className="text-[12px] font-normal">Back</span>
          </div>
          <div className="flex h-[100%] flex-col justify-between">
            <div className=" w-[calc(100%_+_2px)] rounded-[0px_0px_24px_24px] border border-t-[0] border-[#E4E4E7] bg-[#fff]">
              <div
                className={[' w-full px-[16px]', !userInfo?.publicKey && 'opacity-[0.3]'].join(' ')}
              >
                <div
                  onClick={handleCopy}
                  className="cursor-pointer rounded-[6px] border border-[#E4E4E7] bg-[#fff] px-[16px] py-[4px] text-lg font-normal"
                >
                  {userInfo?.publicKey ? maskWalletAddress(userInfo?.publicKey) : 'Wallet Address'}
                </div>
                <p className="mt-[16px] pb-[18px] text-base font-semibold">
                  {userInfo?.publicKey
                    ? `${
                        userBalance?.length > 0 ? Number(userBalance[0].amount).toString() : 0
                      } Local Coin Tokens`
                    : 'Earned coins today'}
                </p>
              </div>
            </div>

            <div className="mx-[16px] my-[40px] flex flex-col gap-[19px]">
              {userInfo.publicKey && isVerifiedMerchant ? (
                ''
              ) : (
                <div
                  className={[
                    'border border-[#171717] bg-[#FFF] py-[10px] text-center text-lg font-semibold',
                    !userInfo?.publicKey && 'opacity-[0.3]'
                  ].join(' ')}
                >
                  <Link
                    className={`block w-full ${!userInfo?.publicKey && 'cursor-not-allowed'}`}
                    href={userInfo?.publicKey ? '/merchant/register' : '/'}
                  >
                    Apply to become a Merchant
                  </Link>
                </div>
              )}

              <div
                className={[
                  'border border-[#171717] bg-[#FFF] py-[10px] text-center text-lg font-semibold',
                  !userInfo?.publicKey && 'opacity-[0.3]'
                ].join(' ')}
              >
                <Link
                  className={`block w-full ${!userInfo?.publicKey && 'cursor-not-allowed'}`}
                  href={userInfo?.publicKey ? '/campaign/create' : ''}
                >
                  Start a campaign
                </Link>
              </div>
              <div
                className={[
                  'border border-[#171717] bg-[#171717] py-[10px] text-center text-lg font-semibold text-white'
                ].join(' ')}
              >
                {!userInfo?.publicKey && (
                  <Link className="block w-full" href={'/signup'}>
                    Sign In{' '}
                  </Link>
                )}
                {!!userInfo?.publicKey && (
                  <div
                    className="flex items-center justify-center gap-[6px]"
                    onClick={() => setShowPinScreen(true)}
                  >
                    Sign out
                  </div>
                )}
                {/* <Link className="block w-full" href={'/signup'}>
                  {userInfo.publicKey ? (
                    <div className="flex items-center justify-center gap-[6px]">Sign out</div>
                  ) : (
                    'Sign in'
                  )}
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeader;

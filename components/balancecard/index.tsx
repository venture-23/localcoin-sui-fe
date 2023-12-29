'use client';
import { CheckIcon, DocumentIcon } from '@heroicons/react/24/outline';
import useHandleCopy from 'hooks/useCopyText';
import { useMyContext } from 'hooks/useMyContext';
import { maskWalletAddress } from 'utils/clipper';

const BalanceCard = () => {
  const [isCopied, handleCopy] = useHandleCopy({ showToast: true });
  const { userInfo } = useMyContext();
  return (
    <>
      <div className="mb-6 w-full rounded-md bg-gradient-to-r from-secondary from-10% via-sky-500 via-30% to-sky-500 to-60%  p-5">
        <div>
          <p className="m-0 text-xs text-white">Total Balance</p>
          <h2 className="m-0 my-2 text-2xl font-bold text-white">
            0.00 XLM <span className="text-sm font-normal text-white"> = 0.00 USDC </span>
          </h2>
          <div className="m-0 flex items-center gap-1 text-xs text-white">
            <p className="m-0">{maskWalletAddress(userInfo?.publicKey)} </p>
            <p className="m-0" onClick={() => handleCopy(userInfo?.publicKey)}>
              {' '}
              {isCopied ? (
                <CheckIcon className="h-3 w-3" />
              ) : (
                <DocumentIcon width={14} height={14} />
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BalanceCard;

import { DocumentIcon } from '@heroicons/react/24/outline';
import React from 'react';

const BalanceCard = () => {
  return (
    <>
      <div className="mb-6 w-full rounded-md bg-gradient-to-br from-[#f58413] from-30% to-red-800  p-5">
        <div>
          <p className="m-0 text-xs text-white">Total Balance</p>
          <h2 className="m-0 my-2 text-2xl font-bold text-white">
            0.00 XLM <span className="text-sm font-normal text-white"> = $ 0.00 </span>
          </h2>
          <div className="m-0 flex items-center gap-1 text-xs text-white">
            <p className="m-0">0x225d....8x001 </p>
            <p className="m-0">
              {' '}
              <DocumentIcon width={14} height={14} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BalanceCard;

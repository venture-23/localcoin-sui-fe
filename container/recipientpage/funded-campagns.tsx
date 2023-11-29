import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface FundedCampaginsProps {
  title: string;
  amount: string;
  date?: string;
}

const FundedCampagins: React.FC<FundedCampaginsProps> = ({ title, amount, date }) => {
  return (
    <>
      <div className="flex w-full justify-between rounded-md bg-white p-4 shadow-lg">
        <div>
          <p className="text-base">{title}</p>
          <p className="text-slate-500">{date}</p>
        </div>
        <div className="text-green-500">
          <p className="flex items-center justify-center gap-1">
            <ArrowDownCircleIcon className="h-6 w-6" />
            <span>{amount}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default FundedCampagins;

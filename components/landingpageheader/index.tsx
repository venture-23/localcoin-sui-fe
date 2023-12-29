import { UserIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface LandingHeaderProps {
  pageName?: string;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ pageName }) => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between pt-10 ">
        <p className="text-heading">{pageName} </p>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/50">
          <UserIcon width={20} height={20} color="white" />
        </div>
      </div>
    </>
  );
};

export default LandingHeader;

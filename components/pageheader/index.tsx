import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

interface PageHeaderProps {
  pageHeaderTitle?: any;
  backLink?: any;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageHeaderTitle, backLink }) => {
  return (
    <>
      <div className="mb-6 flex items-center gap-3 pt-10">
        <Link href={backLink}>
          <ChevronLeftIcon width={24} height={24} />
        </Link>
        <div className="">
          <h2 className="text-2xl font-bold ">{pageHeaderTitle}</h2>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
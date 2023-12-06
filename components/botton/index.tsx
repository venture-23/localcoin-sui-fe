import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  text: string;
  buttonIcon?: any;
  link?: string;
  query?: any;
  buttonType?: any;
  underline?: any;
}

const Button: React.FC<ButtonProps> = ({
  text,
  buttonIcon,
  link,
  query,
  buttonType = 'primary',
  underline
}) => {
  return (
    <>
      <Link className="w-full" href={query ? { pathname: link, query: query } : link || ''}>
        <button
          type="button"
          className={`w-full rounded-[4px] ${
            buttonType === 'primary'
              ? 'bg-[#1384F5] font-bold text-white'
              : ' bg-[#F7F8FA] font-semibold text-[#212B34]'
          }  flex items-center justify-center gap-4 
          px-6 py-3.5 text-base ${underline} `}
        >
          <span>{buttonIcon}</span>
          <span>{text}</span>
        </button>
      </Link>
    </>
  );
};

export default Button;

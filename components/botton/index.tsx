'use client';

import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  text: string;
  buttonIcon?: any;
  link?: string;
  query?: any;
  buttonType?: any;
  buttonBg?: any;
  underline?: any;
  textOrder?: any;
  iconOrder?: any;
  disabled?: boolean;
  handleClick?: () => void;
  showLoader?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  buttonIcon,
  link,
  query,
  buttonType = 'primary',
  buttonBg = '#fff',
  underline,
  textOrder,
  iconOrder,
  disabled = false,
  handleClick,
  showLoader = false
}) => {
  return (
    <>
      <Link
        className="w-full"
        href={handleClick ? '#' : query ? { pathname: link, query: query } : link || ''}
      >
        <button
          onClick={() => (handleClick ? handleClick() : null)}
          disabled={disabled}
          type="button"
          className={`w-full rounded-[4px] ${
            buttonType === 'primary'
              ? 'bg-[#000] font-bold text-white disabled:opacity-30'
              : buttonType === 'secondary'
              ? 'bg-[#FAD146] font-bold text-[#000] disabled:opacity-30'
              : buttonType === 'outlined'
              ? 'bg-[transparent] font-bold text-[#000] disabled:opacity-30 border border-[#DF5B5B]'
              : buttonType === 'tertiary'
              ? 'bg-[#1653AE] font-bold text-[#fff] disabled:opacity-30'
              : `bg-[${buttonBg} !important] font-semibold text-[#212B34] disabled:opacity-30`
          }  flex items-center justify-center gap-4 
          px-6 py-3.5 text-base ${underline}`}
        >
          <div className={`${iconOrder}`}>{buttonIcon}</div>
          <p className={`${textOrder} m-0`}>{text}</p>
          {showLoader && (
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </button>
      </Link>
    </>
  );
};

export default Button;

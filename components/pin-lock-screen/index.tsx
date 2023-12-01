'use client';

import { useMyContext } from 'hooks/useMyContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { checkPinCorrect } from 'services/encrypt-decrypt-data';
import './app.css';
import { BackspaceIcon } from '@heroicons/react/24/outline';

export default function PinLockScreen(props: any) {
  const { children } = props;
  const {
    setshowPinScreen,
    setUserEnterPin,
    checkPinCode,
    setCheckPinCode,
    redirectTo,
    setRedirectTo
  } = useMyContext();
  const [pinData, setPinData] = useState<any>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleClick = (value: string | number) => {
    if (pinData.length + 1 === 4) {
      setError('');
      const enterPin = pinData + value.toString();
      setPinData(enterPin);

      if (checkPinCode) {
        const decodedRes = checkPinCorrect(enterPin);

        if (decodedRes) {
          if (redirectTo) {
            setRedirectTo(false);
            router.push(`/${decodedRes.userType}`);
          }

          setCheckPinCode(false);
          setshowPinScreen(false);
        } else {
          setError('Invalid Pin');
        }
      } else {
        setshowPinScreen(false);
        setUserEnterPin(enterPin);
      }
    } else if (pinData.length + 1 <= 4) {
      setError('');
      setPinData((prevPin: string) => prevPin + value.toString());
    }
  };

  const handleRemove = () => {
    if (pinData) {
      setError('');
      setPinData((prevPin: string) => prevPin.slice(0, -1));
    }
  };
  return (
    <>
      <div className=" fixed z-[1000] h-full w-full  bg-white ">
        <div className="modal-content container mx-auto py-16">
          <h1 className="mb-6 text-center font-bold">Please enter your PIN</h1>
          <div className="grid grid-cols-4 gap-3 px-6">
            {/* {pinData} */}
            <div className="flex min-h-[56px] items-center justify-center rounded-md bg-slate-100 text-lg font-bold">
              {pinData.slice(0, 1)}
            </div>
            <div className="flex min-h-[56px] items-center justify-center rounded-md bg-slate-100 text-lg font-bold">
              {pinData.slice(1, 2)}
            </div>
            <div className="flex min-h-[56px] items-center justify-center rounded-md bg-slate-100 text-lg font-bold">
              {pinData.slice(2, 3)}
            </div>
            <div className="flex min-h-[56px] items-center justify-center rounded-md bg-slate-100 text-lg font-bold">
              {pinData.slice(3, 4)}
            </div>
          </div>
          <div className="my-3 text-center text-sm text-red-500 ">{error}</div>
          <div className="">
            <div className="grid grid-cols-3 gap-4 rounded-md border bg-slate-50 p-4">
              {new Array(9).fill('0').map((x, index) => (
                <div
                  className="rounded-md  bg-white p-6 text-center"
                  key={index + 1 + ''}
                  onClick={() => handleClick(index + 1 + '')}
                >
                  {' '}
                  {index + 1}
                </div>
              ))}
              <div className="pointer-events-none bg-slate-50"></div>
              <div className="  ">
                <div
                  className="col-span-3  rounded-md bg-white p-6 text-center"
                  onClick={() => handleClick(0 + '')}
                >
                  0
                </div>
              </div>
              <div
                className="flex items-center justify-center rounded-md bg-white p-6"
                onClick={() => handleRemove()}
              >
                <BackspaceIcon className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

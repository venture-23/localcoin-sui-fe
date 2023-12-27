'use client';
import { BackspaceIcon } from '@heroicons/react/24/outline';
import { useMerchant } from 'hooks/useMerchant';
import { useMyContext } from 'hooks/useMyContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkPinCorrect, encodeToken } from 'services/encrypt-decrypt-data';
import './app.css';

export default function PinLockScreen(props: any) {
  const { children } = props;
  const {
    setshowPinScreen,
    setUserEnterPin,
    checkPinCode,
    setCheckPinCode,
    redirectTo,
    setRedirectTo,
    setUserInfo,
    userInfo
  } = useMyContext();
  const [pinData, setPinData] = useState<any>([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const [registerMerchant, setRegisterMerchant] = useState(false);
  useMerchant({ registerMerchant, data: userInfo });
  let intervalId: any; // Variable to store the interval ID
  useEffect(() => {
    return () => {
      clearInterval(intervalId); // Clear the interval on component unmount
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleClick = (value: string | number) => {
    if (pinData.length + 1 === 4) {
      setError('');
      const enterPin = pinData + value.toString();
      setPinData(enterPin);

      if (checkPinCode) {
        const decodedRes = checkPinCorrect(enterPin);
        if (decodedRes) {
          console.log({ decodedRes });
          setUserInfo(decodedRes);
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
        try {
          localStorage.setItem('local-coin', encodeToken(userInfo, enterPin));
          setUserEnterPin(enterPin);
          setUserInfo((prevValue: any) => ({ ...prevValue }));
          if (userInfo.userType === 'merchant') {
            setRegisterMerchant(true);
          }
          router.push(`/${userInfo.userType}`);
          // setshowPinScreen(false);
          setTimeout(() => {
            setshowPinScreen(false);
            clearInterval(intervalId);
          }, 500);
        } catch (error: any) {
          throw new Error(error);
        }
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
      <div className=" pin_lock fixed z-[1000]   grid  h-screen  w-full  place-items-center bg-white">
        <div className="container mx-auto ">
          <div className="modal-content">
            <div className="my-6 flex items-center justify-center">
              <Image src={'/enterPIN.png'} width={250} height={250} alt="image verify" />
            </div>
            <div
              className="text-center "
              onClick={() => {
                window.location.reload();
                localStorage.removeItem('local-coin');
              }}
            >
              <h1 className="text-xl font-bold">Please Enter Your PIN</h1>
            </div>
            <div className="mx-auto my-4 flex justify-center gap-2">
              {/* {pinData} */}
              <div className="flex  h-[50px] w-[50px] items-center justify-center rounded-md bg-slate-100 text-lg font-bold">
                {pinData.slice(0, 1)}
              </div>
              <div className="flex  h-[50px] w-[50px] items-center justify-center rounded-md bg-slate-100 text-lg font-bold">
                {pinData.slice(1, 2)}
              </div>
              <div className="flex  h-[50px] w-[50px] items-center justify-center rounded-md bg-slate-100 text-lg font-bold">
                {pinData.slice(2, 3)}
              </div>
              <div className="flex  h-[50px] w-[50px] items-center justify-center rounded-md bg-slate-100 text-lg font-bold">
                {pinData.slice(3, 4)}
              </div>
            </div>
            <p className="my-1 text-center text-sm font-bold text-red-500 ">{error}</p>
            <div className="">
              <div className="grid w-full grid-cols-3 gap-3 rounded-md border bg-slate-50 p-3">
                {new Array(9).fill('0').map((x, index) => (
                  <div
                    className="rounded-md bg-white p-6 text-center"
                    key={index + 1 + ''}
                    onClick={() => handleClick(index + 1 + '')}
                  >
                    {' '}
                    {index + 1}
                  </div>
                ))}
                <div className="pointer-events-none bg-slate-50"></div>
                <div className="">
                  <div
                    className="col-span-3 rounded-md bg-white p-6 text-center"
                    onClick={() => handleClick(0 + '')}
                  >
                    0
                  </div>
                </div>
                <div
                  className="flex items-center justify-center rounded-md bg-primary p-6 text-white"
                  onClick={() => handleRemove()}
                >
                  <BackspaceIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

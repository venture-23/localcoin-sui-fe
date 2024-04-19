'use client';
import { BackspaceIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { MyContext } from 'app/providers';
import Button from 'components/botton';
import CustomToaster from 'components/toaster';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { checkPinCorrect, decodeToken } from 'services/encrypt-decrypt-data';
import './app.css';

export default function PinLockScreen(props: any) {
  const { cookieValue, isInCached: isInCookies, children } = props;
  const pathname = usePathname();
  const [showPinLockScreen, setShowPinScreen] = useState(
    pathname === '/signup' || isInCookies || false
  );
  const [checkPinCode, setCheckPinCode] = useState(false);
  const [redirectTo, setRedirectTo] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});


  const [userEnterPinData, setUserEnterPinData] = useState<any>('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    setError('');
      const enterPin = userEnterPinData.toString();
      setUserEnterPinData(enterPin);
      if (isInCookies) {
        if (checkPinCorrect(cookieValue, enterPin)) {
          const userD = decodeToken(cookieValue, enterPin)
          setUserInfo({ ...userD, enterPin });
          setUserEnterPinData('');
          setShowPinScreen(false);
          setCheckPinCode(false);
        } else {
          setError('Invalid Pin');
        }
      } else {
        setUserInfo({ ...userInfo, enterPin });
        setShowPinScreen(false);
      }
  }

  const handleClick = (value: string | number) => {
    // if (userEnterPinData.length + 1 === 4) {
    //   setError('');
    //   const enterPin = userEnterPinData + value.toString();
    //   setUserEnterPinData(enterPin);
    //   if (isInCookies) {
    //     if (checkPinCorrect(cookieValue, enterPin)) {
    //       const userD = decodeToken(cookieValue, enterPin)
    //       setUserInfo({ ...userD, enterPin });
    //       setUserEnterPinData('');
    //       setShowPinScreen(false);
    //       setCheckPinCode(false);
    //     } else {
    //       setError('Invalid Pin');
    //     }
    //   } else {
    //     setUserInfo({ ...userInfo, enterPin });
    //     setShowPinScreen(false);
    //   }
    // } else if (userEnterPinData.length + 1 <= 4) {
    //   setError('');
    //   setUserEnterPinData((prevPin: string) => prevPin + value.toString());
    // }
    if (userEnterPinData.length + 1 <= 4) {
      setError('');
      setUserEnterPinData((prevPin: string) => prevPin + value.toString());
    }
  };

  const handleRemove = () => {
    if (userEnterPinData) {
      setError('');
      setUserEnterPinData((prevPin: string) => prevPin.slice(0, -1));
    }
  };

  const requiredAuthentication = (callFunction: any) => {
    setCheckPinCode(true);
    // console.log('now i am calling');
    // callFunction();
  };

  return (
    <MyContext.Provider
      value={{
        setShowPinScreen,
        setRedirectTo,
        setUserInfo,
        userInfo,
        redirectTo,
        checkPinCode,
        requiredAuthentication
      }}
    >
      {((showPinLockScreen || checkPinCode) && (
        <div className=" pin_lock fixed z-[1000]   grid  h-screen  w-full  place-items-center bg-white">
          {checkPinCode && (
            <div
              onClick={() => {
                setCheckPinCode(false);
                setShowPinScreen(false);
              }}
            >
              <XCircleIcon width={24} height={24} />
            </div>
          )}
          <div className="container mx-auto ">
            <div className="modal-content">
              <div className="my-6 flex items-center justify-center">
                <Image src={'/enterPIN.png'} width={250} height={250} alt="image verify" />
              </div>
              <div
                className="text-center"
                onClick={() => {
                  window.location.reload();
                  localStorage.removeItem('local-coin');
                }}
              >
                <h1 className="text-xl font-bold">
                  {checkPinCode
                    ? 'Enter your pin to continue'
                    : isInCookies
                    ? 'Please Enter Your PIN'
                    : 'Setup Sign in PIN'}
                </h1>
              </div>
              <div className="mx-auto my-4 flex justify-center gap-2">
                <div className="flex  h-[50px] w-[50px] items-center justify-center rounded-md bg-slate-100 text-lg font-bold">
                  {userEnterPinData.slice(0, 1)}
                </div>
                <div className="flex  h-[50px] w-[50px] items-center justify-center rounded-md bg-slate-100 text-lg font-bold">
                  {userEnterPinData.slice(1, 2)}
                </div>
                <div className="flex  h-[50px] w-[50px] items-center justify-center rounded-md bg-slate-100 text-lg font-bold">
                  {userEnterPinData.slice(2, 3)}
                </div>
                <div className="flex  h-[50px] w-[50px] items-center justify-center rounded-md bg-slate-100 text-lg font-bold">
                  {userEnterPinData.slice(3, 4)}
                </div>
              </div>
              <p className="my-1 text-center text-sm font-bold text-red-500 ">{error}</p>

              <div className="mb-[20px]">
                        
                  <Button disabled={userEnterPinData?.length < 4} handleClick={handleSignUp} buttonType={'primary'} text="Continue" />
              </div>
              <div className="">
                <div className="grid bg-[#ced2d9] backdrop-blur-[35px] w-full grid-cols-3 gap-3 p-3">
                        {new Array(9).fill('0').map((x, index) => (
                    <div
                      className="rounded-[5px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.30)] bg-white p-[12px] text-center"
                      key={index + 1 + ''}
                      onClick={() => handleClick(index + 1 + '')}
                    >
                      {' '}
                      {index + 1}
                    </div>
                        ))}
                        <div className="pointer-events-none bg-none"></div>
                        <div className="">
                    <div
                      className="col-span-3 shadow-[0px_1px_0px_0px_rgba(0,0,0,0.30)] rounded-[5px] bg-white p-[12px] text-center"
                      onClick={() => handleClick(0 + '')}
                    >
                      0
                    </div>
                        </div>
                        <div
                    className="flex items-center justify-center rounded-md bg-none p-[12p]"
                    onClick={() => handleRemove()}
                  >
                    <BackspaceIcon className="h-6 w-6" />
                        </div>
                      </div>
              </div>
            </div>
          </div>
        </div>
      )) ||
        null}
      {children}
      <CustomToaster />
    </MyContext.Provider>
  );
}

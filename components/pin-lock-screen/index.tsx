'use client';

import { useMyContext } from 'hooks/useMyContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { checkPinCorrect } from 'services/encrypt-decrypt-data';
import './app.css';

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
      <div className="modal-overlay">
        <div className="modal-content text-center">
          <div>Enter Your Pin</div>
          <br />
          <br />
          <br />
          Entered Pin : {pinData}
          <div>{error}</div>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-9">
              {new Array(9).fill('0').map((x, index) => (
                <div className="" key={index + 1 + ''} onClick={() => handleClick(index + 1 + '')}>
                  {' '}
                  {index + 1}
                </div>
              ))}
              <div className="flex gap-2">
                <div onClick={() => handleClick(0 + '')}>0</div>
                <div onClick={() => handleRemove()}>cross</div>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

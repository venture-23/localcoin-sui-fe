'use client';

import { useMyContext } from 'hooks/useMyContext';
import { useState } from 'react';
import './app.css';

export default function PinLockScreen(props: any) {
  const { setshowPinScreen } = useMyContext();
  const [pinData, setPinData] = useState<any>([]);
  const handleClick = (value: string | number) => {
    // console.log({ value: value },value.);
    if (pinData.length < 4) {
      setPinData((prevPin: string) => prevPin + value.toString());
      // setshowPinScreen(false);
    } else {
      setshowPinScreen(false);
    }
  };
  const handleRemove = () => {
    if (pinData) setPinData((prevPin: string) => prevPin.slice(0, -1));
  };
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content text-center">
          <div>Enter Your Pin</div>
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
        {props.children}
      </div>
    </>
  );
}

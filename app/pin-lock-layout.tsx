'use client';

import PinLockScreen from 'components/pin-lock-screen';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getLocalStorageValue } from 'services/encrypt-decrypt-data';
import { MyContext } from './providers';

export default function RootLayoutClient({ children }: React.PropsWithChildren) {
  const [showPinLockScreen, setshowPinScreen] = useState(false);
  const [userEnterPin, setUserEnterPin] = useState<any>('');
  const [checkPinCode, setCheckPinCode] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const res = getLocalStorageValue('local-coin');
    if (res) {
      console.log({ res });
      setshowPinScreen(true);
      setCheckPinCode(true);
    } else {
      router.push('/');
    }
  }, []);

  return (
    <MyContext.Provider
      value={{ setshowPinScreen, setUserEnterPin, setCheckPinCode, userEnterPin, checkPinCode }}
    >
      {(showPinLockScreen || checkPinCode) && <PinLockScreen />}
      {children}
    </MyContext.Provider>
  );
}

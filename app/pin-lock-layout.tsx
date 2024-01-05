'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getLocalStorageValue } from 'services/encrypt-decrypt-data';
import { MyContext } from './providers';

export default function RootLayoutClient({ children }: React.PropsWithChildren) {
  const [showPinLockScreen, setshowPinScreen] = useState(false);
  const [userEnterPin, setUserEnterPin] = useState<any>('');
  const [checkPinCode, setCheckPinCode] = useState(false);
  const [redirectTo, setRedirectTo] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});

  const router = useRouter();
  useEffect(() => {
    const res = getLocalStorageValue('local-coin');
    if (res) {
      // setshowPinScreen(true);
      // setCheckPinCode(true);
      // setRedirectTo(true);
    } else {
      // router.push('/');
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        setshowPinScreen,
        setUserEnterPin,
        setCheckPinCode,
        setRedirectTo,
        userEnterPin,
        setUserInfo,
        userInfo,
        redirectTo,
        checkPinCode
      }}
    >
      {/* {(showPinLockScreen || checkPinCode) && <PinLockScreen />} */}
      {children}
    </MyContext.Provider>
  );
}
